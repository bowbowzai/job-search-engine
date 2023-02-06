import requests
import time

from queue import Queue
from threading import Thread
from django.shortcuts import render
from django.db import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from bs4 import BeautifulSoup

from .utils import *

from jobs.models import Job


# Create your views here.
@api_view(["GET"])
def scrape(request, *args, **kwargs):
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
            Job.objects.create(**job)
        except IntegrityError as e:
            Job.objects.update(**job)

    return Response(data=all_jobs)
