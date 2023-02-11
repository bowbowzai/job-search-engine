from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_img = models.ImageField(
        upload_to="profile_images", default="profile_images/default.jpg"
    )
    desired_job = models.CharField(max_length=255, blank=True, null=True)
    desired_location = models.CharField(max_length=255, blank=True, null=True)
    position = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.user.get_full_name()}'s profile"
