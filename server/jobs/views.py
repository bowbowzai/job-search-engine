from django.shortcuts import render
from rest_framework import status, generics
from .models import Job
from .serializers import JobSerializer


# Create your views here.
class JobLists(generics.ListAPIView):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
