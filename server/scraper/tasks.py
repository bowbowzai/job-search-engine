from celery import shared_task


@shared_task(bind=True)
def scraped_jobs(self):
    return "Scraped!"
