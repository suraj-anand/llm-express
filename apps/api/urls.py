from django.urls import path
from apps.api.user_secrets.views import UserSecretsAPI
from . import views

urlpatterns = [
    path("auth-check/", views.AuthCheckAPI.as_view()),
    path("login/", views.LoginAPI.as_view()),
    path("register/", views.RegisterAPI.as_view()),
    path("update-profile/", views.ChangeProfileAPI.as_view()),
    path("update-password/", views.ChangePasswordAPI.as_view()),
    path("update-bio/", views.UserBioAPI.as_view()),
    path("user/<str:user_id>", views.UserDetails.as_view()),
    path("user-secrets/", UserSecretsAPI.as_view()),
    path("logout/", views.LogoutAPI.as_view()),
    path("media/", views.MediaServeAPI.as_view()),
    path("ping/", views.HealthCheckView.as_view(), name="health-check-view"),
]