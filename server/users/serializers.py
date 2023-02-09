from rest_framework import serializers
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
        )


class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "password"]
