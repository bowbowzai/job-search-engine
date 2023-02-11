from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email")
    user_full_name = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "id",
            "email",
            "user_full_name",
            "profile_img",
            "desired_job",
            "desired_location",
            "position",
        ]

    def get_user_full_name(self, instance):
        return instance.user.first_name + " " + instance.user.last_name

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get("request")
        if request is not None:
            representation["profile_img"] = request.build_absolute_uri(
                representation["profile_img"]
            )
        return representation


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "profile_img",
            "desired_job",
            "desired_location",
            "position",
        ]
