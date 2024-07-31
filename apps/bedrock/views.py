from apps.api.utils import parse_user_session
from apps.api.permissions import Authenticated, HasAWSSecrets
from apps.api.models import UserSecrets
from rest_framework.views import APIView
from rest_framework.response import Response
from llm_express.utils import CryptoService
from .helper import AwsAPI, save_model, load_model
from .models import UserBedrockModels
from .serializers import UserBedrockModelSerializer
crypto = CryptoService()

def get_aws_api(request):
    user_id = parse_user_session(request).get("user_id")
    user_secret = UserSecrets.objects.filter(user_id=user_id)
    aws_access_key = crypto.decrypt(user_secret[0].aws_access_key)
    aws_secret_access_key = crypto.decrypt(user_secret[0].aws_secret_access_key)
    aws_api = AwsAPI(aws_access_key=aws_access_key, aws_secret_access_key=aws_secret_access_key)
    return aws_api
        
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
        user_id = parse_user_session(request).get("user_id")
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
            "top_k": top_k if top_k else 250,
            "top_p": top_p if top_p else 1,
        }
        try:
            user_id = parse_user_session(request).get("user_id")
            aws_api = get_aws_api(request)
            # create model object
            model = aws_api.create_model(model_id=model_id, model_kwargs=model_kwargs)
            
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
