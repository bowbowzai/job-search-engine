from django.urls import path

from .views import *

urlpatterns = [path("all-jobs/", JobLists.as_view())]
