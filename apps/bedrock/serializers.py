from rest_framework.serializers import ModelSerializer
from .models import UserBedrockModels

class UserBedrockModelSerializer(ModelSerializer):
    class Meta:
        model = UserBedrockModels
        fields = "__all__"