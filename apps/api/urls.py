from django.urls import path
from . import views

urlpatterns = [
    path("ping/", views.HealthCheckView.as_view(), name="health-check-view"),
]