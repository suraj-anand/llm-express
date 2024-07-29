from django.urls import path
from . import views

urlpatterns = [
    path("list-models/", views.ListModelsAPI.as_view(), name="list-models")
]