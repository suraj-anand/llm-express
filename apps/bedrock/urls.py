from django.urls import path
from . import views

urlpatterns = [
    path("list-models/", views.ListModelsAPI.as_view(), name="list-models"), # available models in Bedrock
    path("model/", views.ModelsAPI.as_view(), name="model"), # get - list user created models, post - create
    path("chat/<str:model_id>/", views.ChatAPI.as_view(), name="chat"), #post - create chat, put - to chat
]