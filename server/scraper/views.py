import requests

from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from bs4 import BeautifulSoup


# Create your views here.
@api_view(["GET"])
def scrape(request, *args, **kwargs):
    URL = "https://realpython.github.io/fake-jobs/"
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, "html.parser")
    result = soup.find(id="ResultsContainer")

    # python_jobs = result.find_all(
    #     "h2", string=lambda text: "python" in text.lower().strip()
    # )
    # print(len(python_jobs))

    # for job_element in python_jobs:
    #     title_element = job_element.find("h2", class_="title")
    #     company_element = job_element.find("h3", class_="company")
    #     location_element = job_element.find("p", class_="location")
    #     print(title_element.text.strip())
    #     print(company_element.text.strip())
    #     print(location_element.text.strip())

    jobs = result.find_all("div", class_="card-content")

    for job in jobs:
        title = job.find("h2", class_=["title", " is-5"])
        company = job.find("h3", class_=["subtitle", "is-6", "company"])
        location = job.find("p", class_="location")
        print(f"{title.text.strip()} {company.text.strip()} {location.text.strip()}")
        links = job.find_all("a", class_="card-footer-item")
        link_url = links[1]["href"]
        print(f"Apply here: {link_url}")
        print()
        print()
    return Response("hello")
