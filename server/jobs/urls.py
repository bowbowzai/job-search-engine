from django.urls import path

from .views import *

urlpatterns = [
    path("search/<str:keyword>/", JobSearch.as_view()),
    path("all-jobs/", JobLists.as_view()),
    path("recommends/", RecommendedJob.as_view()),
]
