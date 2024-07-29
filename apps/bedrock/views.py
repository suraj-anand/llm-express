from apps.api.utils import parse_user_session
from apps.api.permissions import Authenticated, HasAWSSecrets
from apps.api.models import UserSecrets
from rest_framework.views import APIView
from rest_framework.response import Response
from llm_express.utils import CryptoService
from .helper import AwsAPI
crypto = CryptoService()

class ListModelsAPI(APIView):
    
    permission_classes = [Authenticated, HasAWSSecrets]

    def get(self, request):
        data = []
        user_id = parse_user_session(request).get("user_id")
        user_secret = UserSecrets.objects.filter(user_id=user_id)
        if user_secret:
            aws_access_key = crypto.decrypt(user_secret[0].aws_access_key)
            aws_secret_access_key = crypto.decrypt(user_secret[0].aws_secret_access_key)
            aws_api = AwsAPI(aws_access_key=aws_access_key, aws_secret_access_key=aws_secret_access_key)
            data = aws_api.list_models()
        return Response(data)    
