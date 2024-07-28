import traceback
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response


from apps.api.models import UserSecrets, User
from apps.api.serializers import UserSecretSerializer
from apps.api.utils import parse_user_session
from apps.api.permissions import Authenticated
from apps.api.constants import AWS, HUGGING_FACE
from apps.huggingface.helper import HuggingFaceAPI
from apps.huggingface.exceptions import InvalidTokenException
from apps.bedrock.helper import AwsAPI
from llm_express.utils import CryptoService


crypto = CryptoService()

def setHuggingFaceToken(request):
    token = request.data.get("token")
    hapi = HuggingFaceAPI(token)
    try:
        userInfo = hapi.whoAmI()
        data = parse_user_session(request)
        user_id = data.get("user_id")
        token = request.data.get("token")
        user_secret = None
        if UserSecrets.objects.filter(user_id=user_id):
            user_secret = UserSecrets.objects.filter(user_id=User(user_id))[0]
            user_secret.hugging_face_token = crypto.encrypt(token)
        else:
            user_secret = UserSecrets(user_id=User(user_id))
            user_secret.hugging_face_token = crypto.encrypt(token)
        user_secret.save()
        return Response({"message": "Hugging Face token saved successfully.", "userData": userInfo}, status=201)
    except InvalidTokenException:
        return Response({"message": "Invalid hugging_face_token token"}, status=400)
    except Exception as e:
        traceback.format_exc(e)
        return Response({"message": "something wen't wrong"}, status=500)


def setAwsSecrets(request):
    aws_access_key = request.data.get("aws_access_key")
    aws_secret_access_key = request.data.get("aws_secret_access_key")
    aws_api = AwsAPI(aws_access_key=aws_access_key, aws_secret_access_key=aws_secret_access_key)
    try:
        allowed = aws_api.validate_access()
        if not allowed:
            return Response({"message": "access_key's may be invalid or doesn't contain bedrock access, please ensure correct access_key's are provided"}, status=403)
        data = parse_user_session(request)
        user_id = data.get("user_id")
        user_secret = None
        if UserSecrets.objects.filter(user_id=user_id):
            user_secret = UserSecrets.objects.filter(user_id=User(user_id))[0]
        else:
            user_secret = UserSecrets(user_id=User(user_id))
        user_secret.aws_access_key = crypto.encrypt(aws_access_key)
        user_secret.aws_secret_access_key = crypto.encrypt(aws_secret_access_key)
        user_secret.save()
        return Response({"message": "AWS secrets saved successfully."}, status=201)
    except Exception as e:
        traceback.format_exc(e)
        return Response({"message": "something wen't wrong"}, status=500)


class UserSecretsAPI(APIView):
    permission_classes = [Authenticated]

    def get(self, request):
        user_secret = None
        user_id = parse_user_session(request).get("user_id")
        resp = {"hugging_face_token": False, "aws_access_key": False, "aws_secret_access_key": False}
        try:
            user_secret = UserSecrets.objects.get(user_id=User(user_id))
            if user_secret.hugging_face_token:
                resp['hugging_face_token'] = True
            if user_secret.aws_access_key and user_secret.aws_secret_access_key:
                resp['aws_access_key'] = True
                resp['aws_secret_access_key'] = True
        except ObjectDoesNotExist:
            pass
        return Response(resp)


    def post(self, request):
        type = request.data.get("type")
        if type == HUGGING_FACE:
            return setHuggingFaceToken(request)
        elif type == AWS:
            return setAwsSecrets(request)
        else:
            return Response({"message": "Invalid type"}, status=400)
    
    def put(self, request):
        type = request.data.get("type")
        if type == HUGGING_FACE:
            return setHuggingFaceToken(request)
        elif type == AWS:
            return setAwsSecrets(request)
        else:
            return Response({"message": "Invalid type"}, status=400)
