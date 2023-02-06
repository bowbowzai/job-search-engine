from django.db import models
from common.models import PseudoWrapper


class Job(PseudoWrapper):
    job_title = models.CharField(max_length=255)
    job_company = models.CharField(max_length=255)
    job_location = models.CharField(max_length=255)
    post_time = models.CharField(max_length=100)
    access_link = models.URLField()
    is_job_still_available = models.BooleanField(default=True)
