from django.urls import path
from .views import *

urlpatterns = [
    path("me/<str:user_id>/", RetrieveUser.as_view()),
    path("update/", ProfileUpdate.as_view()),
]
