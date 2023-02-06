import requests

from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from bs4 import BeautifulSoup

from .utils import *


# Create your views here.
@api_view(["GET"])
def scrape(request, *args, **kwargs):
    return Response("hello")
