from celery import shared_task
from threading import Thread
from .utils import *
from jobs.models import Job
from django.db import IntegrityError


@shared_task(bind=True)
def scraped_jobs(self):
    all_jobs = []
    thread1 = Thread(target=lambda: all_jobs.extend(jobstore_jobs_scraped()))
    thread2 = Thread(target=lambda: all_jobs.extend(jobstreet_jobs_scraped()))
    thread3 = Thread(target=lambda: all_jobs.extend(linkedin_jobs_scraped()))

    thread1.start()
    thread2.start()
    thread3.start()

    thread1.join()
    thread2.join()
    thread3.join()

    # save the data into database
    for job in all_jobs:
        try:
            existed_job, created = Job.objects.get_or_create(**job)
            if existed_job:
                # job already exists in database
                # update it
                existed_job.job_title = job.get("job_title")
                existed_job.job_company = job.get("job_company")
                existed_job.job_location = job.get("job_location")
                existed_job.post_time = job.get("post_time")
                existed_job.job_link = job.get("job_link")
                existed_job.save()
        except IntegrityError as e:
            continue
        except Exception as e:
            print(e)
    return "Scraped!"
