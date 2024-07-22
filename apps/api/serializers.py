from rest_framework.serializers import ModelSerializer
from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class SimpleUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'creation_time', "email"]