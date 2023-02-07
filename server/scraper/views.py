from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import *


@api_view(["GET"])
def index(request):
    jobstore_jobs_scraped()
    return Response("hello")
