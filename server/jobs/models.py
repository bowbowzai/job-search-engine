from django.db import models

from common.models import PseudoWrapper


class Job(PseudoWrapper):
    job_title = models.CharField(max_length=255)
    job_company = models.CharField(max_length=255)
    job_location = models.CharField(max_length=255)
    post_time = models.CharField(max_length=100)
    job_link = models.URLField(max_length=350)
    is_job_still_available = models.BooleanField(default=True)
    company_logo_url = models.URLField(max_length=350, blank=True, null=True)

    class Meta:
        unique_together = (
            (
                "job_title",
                "job_company",
                "job_location",
            ),
        )

    def __str__(self) -> str:
        return f"{self.job_title} in {self.job_company} at {self.job_location}"
