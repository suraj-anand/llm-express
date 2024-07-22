from rest_framework.serializers import ModelSerializer
from .models import User, UserSecrets

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class SimpleUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'creation_time', "email"]

class UserSecretSerializer(ModelSerializer):
    class Meta:
        model = UserSecrets
        fields = "__all__"