import uuid
from django.db import models
from apps.api.models import User

# Create your models here.
class UserBedrockModels(models.Model):
    id = models.TextField(primary_key=True, default=uuid.uuid4)
    model_id = models.TextField(null=True, blank=True, default="")
    created_time = models.DateTimeField(auto_now_add=True)
    model_name = models.TextField(null=True, blank=True, default="")
    input_modalities = models.TextField(null=True, blank=True, default="")
    output_modalities = models.TextField(null=True, blank=True, default="")
    user_created = models.ForeignKey(User, on_delete=models.CASCADE)
    local_path = models.TextField(null=True, blank=True, default="")
    is_valid = models.BooleanField(null=True, blank=True, default=True)
    is_public = models.BooleanField(null=True, blank=True, default=True)