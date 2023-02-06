import uuid
from django.db import models


# Create your models here.
class PseudoWrapper(models.Model):
    pkid = models.BigAutoField(primary_key=True, unique=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True
