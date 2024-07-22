import traceback
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.api.models import UserSecrets, User
from apps.api.serializers import UserSecretSerializer
from apps.api.utils import parse_user_session
from apps.api.permissions import Authenticated
from apps.api.constants import AWS, HUGGING_FACE
from apps.huggingface.helper import HuggingFaceAPI
from apps.huggingface.exceptions import InvalidTokenException
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
        return Response({"message": "Invalid token"}, status=401)
    except Exception as e:
        traceback.format_exc(e)
        return Response({"message": "something wen't wrong"}, status=500)

class UserSecretsAPI(APIView):
    permission_classes = [Authenticated]
    def post(self, request):
        type = request.data.get("type")
        if type == HUGGING_FACE:
            return setHuggingFaceToken(request)
        elif type == AWS:
            pass
        else:
            return Response({"message": "Invalid type"}, status=401)
    
    def put(self, request):
        type = request.data.get("type")
        if type == HUGGING_FACE:
            return setHuggingFaceToken(request)
        elif type == AWS:
            pass
        else:
            return Response({"message": "Invalid type"}, status=401)
