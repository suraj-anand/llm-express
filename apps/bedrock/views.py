from uuid import uuid4
import json
from apps.api.utils import parse_user_session
from apps.api.permissions import Authenticated, HasAWSSecrets
from apps.api.models import UserSecrets
from rest_framework.views import APIView
from rest_framework.response import Response
from llm_express.utils import CryptoService
from .helper import AwsAPI, save_model, load_model, invoke_model
from .models import UserBedrockModels
from .serializers import UserBedrockModelSerializer
from llm_express.aws import ConversationHistory
crypto = CryptoService()
convo = ConversationHistory()

def get_aws_api(request):
    user_id = parse_user_session(request).get("user_id")
    user_secret = UserSecrets.objects.filter(user_id=user_id)
    aws_access_key = crypto.decrypt(user_secret[0].aws_access_key)
    aws_secret_access_key = crypto.decrypt(user_secret[0].aws_secret_access_key)
    aws_api = AwsAPI(aws_access_key=aws_access_key, aws_secret_access_key=aws_secret_access_key)
    return aws_api

def construct_chat_data(chat_id, user_id, model_id, chats) -> dict:
    return {
        "id": chat_id,
        "user_id": user_id,
        "model_id": model_id,
        "chat_history": json.dumps(chats)
    }

def model_chat_validate(request, model_id):
    user_id = parse_user_session(request).get("user_id")
    model = UserBedrockModels.objects.filter(id=model_id)
    if not model:
        return Response({"message": "Invalid model_id"}, status=400)
    model = model[0]
    if model.is_public == False and model.user_created.id != user_id:
        return Response({"message": "You're not authorized to access to this model"}, status=403)
    return model

class ListModelsAPI(APIView):
    
    permission_classes = [Authenticated, HasAWSSecrets]
    def get(self, request):
        data = []
        aws_api = get_aws_api(request)
        data = aws_api.list_models()
        return Response(data)


class ModelsAPI(APIView):

    permission_classes = [Authenticated, HasAWSSecrets]
    def get(self, request):
        type = request.query_params.get("type")
        user_id = parse_user_session(request).get("user_id")
        if type.lower() == "public-models":
            data = UserBedrockModels.objects.filter(user_created_id=user_id, is_public=True)    
        else:
            data = UserBedrockModels.objects.filter(user_created_id=user_id)
        serializer = UserBedrockModelSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        region = request.data.get("region")
        model_id = request.data.get("model_id")
        model_name = request.data.get("model_name")
        max_tokens = request.data.get("max_tokens")
        temperature = request.data.get("temperature")
        top_k = request.data.get("top_k")
        top_p = request.data.get("top_p")
        is_public = True if request.data.get("is_public") else False
        input_modalities =  request.data.get("input_modalities")
        output_modalities = request.data.get("output_modalities")
        model_kwargs =  { 
            "max_tokens": max_tokens if max_tokens else 2048,
            "temperature": temperature if temperature else 0.0,
            "top_k": top_k if top_k else 50,
            "top_p": top_p if top_p else 1,
        }
        try:
            user_id = parse_user_session(request).get("user_id")
            aws_api = get_aws_api(request)
            # create model object
            model, error = aws_api.create_model(model_id=model_id, model_kwargs=model_kwargs)
            if error:
                return Response({"message": f"Error on creating model, {model_id}", "error": str(error)}, status=500)
            # store db instance to track user models
            data = {
                "model_id": model_id,
                "model_name": model_name,
                "input_modalities": input_modalities,
                "output_modalities": output_modalities,
                "user_created" : user_id,
                "is_public": is_public
            }
            serializer = UserBedrockModelSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            id = serializer.data.get("id")
            # save model locally
            save_model(model=model,model_id=id,user_id=user_id)
            return Response({"message": "Model created successfully", "id": id}, status=201)
        except Exception as err:
            return Response({"message": f"unable to create model: {model_id} in region: {region}", "error": str(err)}, status=500)


# API to chat with a model
class ChatAPI(APIView):
    
    permission_classes = [Authenticated]
    
    # type="list" - list chats made with a particular model by a user
    # type=None - list conversations for a particular chat
    def get(self, request, model_id):
        chat_id = request.query_params.get("chat_id")
        type = request.query_params.get("type")
        user_id = parse_user_session(request).get("user_id")
        # validate access
        model = model_chat_validate(request, model_id)
        if isinstance(model, Response):
            return model
        if type and type.lower() == "list":
            context = convo.get_chats_on_model(model_id, user_id)
            return Response({"model_name": model.model_name, "context": context}, status=200)
        if not chat_id:
            return Response({"message": "chat_id is required, if type isn't list"}, status=400)
        # validate access
        model = model_chat_validate(request, model_id)
        if isinstance(model, Response):
            return model
        chat_data = convo.get_chat_data(chat_id=chat_id, user_id=user_id)
        chat_data = {
            **chat_data,
            "chat_history": json.loads(chat_data.get("chat_history", "[]"))
        }
        return Response(chat_data, 200)

    # create new chat
    def post(self, request, model_id):
        user_id = parse_user_session(request).get("user_id")
        chat_id = str(uuid4())
        # validate access
        model = model_chat_validate(request, model_id)
        if isinstance(model, Response):
            return model
        data = {
            "id": chat_id, # new chat_id
            "user_id": user_id,
            "model_id": model_id
        }
        status, err = convo.add_update_chat_data(data)
        if status:
            return Response({"chat_id": chat_id, "message": "new chat created"}, status=201)
        return Response({"message": "error on creating new chat", "error": str(err)}, status=500)
        
        
    # to chat, add news chat entries to db
    def put(self, request, model_id):
        user_id = parse_user_session(request).get("user_id")
        chat_id = request.data.get("chat_id")
        prompt = request.data.get("prompt")
        # validate access
        model = model_chat_validate(request, model_id)
        if isinstance(model, Response):
            return model
        chat_data = convo.get_chat_data(chat_id=chat_id, user_id=user_id)
        chats = chat_data.get("chat_history", [])
        if isinstance(chats, str):
            try:
                chats = json.loads(chats)
            except Exception as err:
                chats = []
        chats.append({"role": "user", "content": prompt}) # add user prompt
        resp, error = invoke_model(
            load_model(model_id=model_id, user_id=model.user_created.id),
            prompt
        )
        if error:
            return Response({"message": "Failure on invoking the model with your prompt", "error": str(error)}, status=500)
        chats.append({"role": "assistant", "content": resp.content}) # add AI response
        convo.add_update_chat_data(construct_chat_data(chat_id, user_id, model_id, chats))
        return Response({"content": resp.content}, status=200)


    # delete chat
    def delete(self, request, model_id):
        chat_id = request.query_params.get("chat_id")
        user_id = request.query_params.get("user_id")
        if not user_id and not chat_id:
            return Response({"message": "user_id & chat_id is required"}, status=400)
        
        if convo.delete_chat(chat_id, user_id):
            return Response({"message": f"{chat_id} deleted"}, status=204)
        else:
            return Response({"message": f"{chat_id} failed"}, status=500)