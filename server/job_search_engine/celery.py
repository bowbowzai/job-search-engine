from __future__ import absolute_import, unicode_literals
import os

from celery import Celery
from celery.schedules import crontab

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "job_search_engine.settings")

app = Celery("job_search_engine")

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object("django.conf:settings", namespace="CELERY")
app.conf.beat_schedule = {
    # Executes every Monday morning at 7:30 a.m.
    "update-jobs-every-5-hours": {
        "task": "scraper.tasks.scraped_jobs",
        "schedule": crontab(hour="*/3", minute=0),
        # "schedule": 60,
    },
}
# Load task modules from all registered Django apps.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
