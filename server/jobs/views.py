from django.shortcuts import render
from django.db.models import Q
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from profiles.models import Profile
from .models import Job
from .serializers import JobSerializer
from .pagination import JobsPagination


# Create your views here.
class JobLists(generics.ListAPIView):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
    pagination_class = JobsPagination


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
        user_desired_job = user.profile.desired_job
        if user_desired_job:
            user_desired_job_list = (
                user_desired_job.split(",")
                if user_desired_job.split(",") != [""]
                else []
            )
        else:
            user_desired_job_list = []

        user_desired_location = user.profile.desired_location

        if user_desired_location:
            user_desired_location_list = (
                user_desired_location.split(",")
                if user_desired_location.split(",") != [""]
                else []
            )
        else:
            user_desired_location_list = []

        desired_list = user_desired_job_list + user_desired_location_list

        if user.profile.position:
            desired_list += [user.profile.position]

        jobs = Job.objects.none()

        for desired_keyword in desired_list:
            job_by_title = Job.objects.filter(
                Q(job_title__icontains=desired_keyword.strip())
                | (Q(job_location__icontains=desired_keyword.strip()))
            )
            jobs = jobs | job_by_title
        serializer = JobSerializer(instance=jobs, many=True)
        data = []
        if len(serializer.data) <= 3:
            data = []
        else:
            data = serializer.data[0:3]
        return Response(
            data,
            status=status.HTTP_200_OK,
        )
