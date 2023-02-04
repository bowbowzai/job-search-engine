import requests
from bs4 import BeautifulSoup

# https://dashboard.scraperapi.com/billing


# https://malaysia.indeed.com/jobs?q=all+job%27s&fromage=1&vjk=a6c0bc6f54b8d70c
def indeed_jobs_scraped():
    pass


# https://www.foundit.my/
# foundit.my/search/it-jobs?searchId=2e180f49-76c8-40d1-af2c-716347e58cd1
def foundit_jobs_scraped():
    pass


def linkedin_jobs_scraped():
    response = requests.get(
        "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=&location=Malaysia&locationId=&geoId=106808692&f_TPR=r86400&position=1&pageNum=0&start=0"
    )
    soup = BeautifulSoup(response.content, "html.parser")
    jobs_list = soup.find_all(
        "div",
        class_="base-card relative w-full hover:no-underline focus:no-underline base-card--link base-search-card base-search-card--link job-search-card",
    )
    for job in jobs_list:
        job_title = job.find("h3", class_="base-search-card__title").text.strip()
        job_company = job.find("a", class_="hidden-nested-link").text.strip()
        job_loaction = job.find("span", class_="job-search-card__location").text.strip()
        post_time_element = job.find("time", class_="job-search-card__listdate--new")
        if post_time_element:
            post_time = post_time_element.text.strip()
        else:
            post_time = "time tag not found"
        access_link_element = job.find(
            "a",
            class_="base-card__full-link absolute top-0 right-0 bottom-0 left-0 p-0 z-[2]",
        )
        access_link = access_link_element["href"]

        print(f"Job title: {job_title}")
        print(f"Job company: {job_company}")
        print(f"Job location: {job_loaction}")
        print(f"Post time: {post_time}")
        print(f"Apply here: {access_link}")
        print()
