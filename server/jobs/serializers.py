from rest_framework import serializers

from .models import Job


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        exclude = (
            "pkid",
            "created_at",
            "is_job_still_available",
            "updated_at",
        )
