import uuid
from django.db import models

# Create your models here.
class User(models.Model):
    id = models.TextField(primary_key=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    name = models.TextField(null=False, blank=False)
    email = models.EmailField(unique=True, null=False, blank=False)
    profile = models.TextField(null=True, blank=True, default="")
    password = models.TextField(blank=False, null=False)
    bio = models.TextField(blank=True, null=True, default="")


class UserSecrets(models.Model):
    id = models.TextField(primary_key=True, default=uuid.uuid4)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, unique=True)
    hugging_face_token = models.TextField(blank=True, null=True, default="")
    aws_access_key = models.TextField(blank=True, null=True, default="")
    aws_secret_access_key = models.TextField(blank=True, null=True, default="")