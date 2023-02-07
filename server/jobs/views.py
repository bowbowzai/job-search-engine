from django.shortcuts import render
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer
from django.db.models import Q


# Create your views here.
class JobLists(generics.ListAPIView):
    serializer_class = JobSerializer
    queryset = Job.objects.all()


class JobSearch(generics.ListAPIView):
    serializer_class = JobSerializer
    queryset = Job.objects.all()

    def get(self, request, *args, **kwargs):
        search_keyword = kwargs.get("keyword")
        jobs = Job.objects.filter(
            Q(job_title__icontains=search_keyword)
            | Q(job_company__icontains=search_keyword)
            | Q(job_location__icontains=search_keyword)
        )

        return Response(
            JobSerializer(instance=jobs, many=True).data, status=status.HTTP_200_OK
        )


class RecommendedJob(generics.ListAPIView):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        # user_skills = user.profile
