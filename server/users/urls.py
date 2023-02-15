from django.urls import path

from .views import *

urlpatterns = [
    path("logout/", logout),
    # path("token/refresh/", refresh_token),
    # path("login/", login),
]
