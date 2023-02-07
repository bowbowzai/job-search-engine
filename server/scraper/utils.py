import requests
import re
from bs4 import BeautifulSoup
from collections import defaultdict

# https://dashboard.scraperapi.com/billing


def jobstore_jobs_scraped():
    try:
        response = requests.get("https://www.jobstore.com/my/search-jobs?since=7")
        soup = BeautifulSoup(response.content, "html.parser")
        job_lists = soup.find_all("div", class_="search_content_result")
        jobs = []
        for job in job_lists:
            job_title = job.find("h2", id="post_internal").text.strip()
            job_company = job.find("div", class_="search_content_result_company").find(
                "a"
            )
            if job_company:
                job_company = job_company.text.strip()
            else:
                job_company = "Company Confidential"
            pattern = re.compile("sect_loc\d+")
            job_location = job.find(
                "div",
                class_="search_content_result_list_info",
                id=pattern,
            ).text.strip()
            post_time = job.find(
                "span", class_="search_content_result_details_ago"
            ).text.strip()
            access_link_pattern = re.compile(
                "https://www.jobstore.com/my/application/apply/\d+"
            )
            job_link_element = job.find("a", attrs={"href": access_link_pattern})
            job_link = job_link_element["href"]
            company_image_element = job.find("div", class_="search_content_result_pic")
            if company_image_element:
                if "assets" in company_image_element["style"]:
                    company_image_path = (
                        company_image_element["style"]
                        .split("url(//assets.jobstore.com/")[1]
                        .split(")")[0]
                    )
                elif "asset" in company_image_element["style"]:
                    company_image_path = (
                        company_image_element["style"]
                        .split("url(//asset.jobstore.com/")[1]
                        .split(")")[0]
                    )
                company_logo_url = "https://assets.jobstore.com/" + str(
                    company_image_path
                )
            else:
                company_logo_url = None
            jobs.append(
                {
                    "job_title": job_title,
                    "job_company": job_company,
                    "job_location": job_location,
                    "post_time": post_time,
                    "job_link": job_link,
                    "company_logo_url": company_logo_url,
                }
            )
        return jobs
    except Exception as e:
        # TODO: send me an email
        print(e)
        pass


def jobstreet_jobs_scraped():
    try:
        response = requests.get(
            "https://www.jobstreet.com.my/en/job-search/malaysia-jobs/?createdAt=3d"
        )
        soup = BeautifulSoup(response.content, "html.parser")
        job_lists = soup.find("div", attrs={"data-automation": "jobListing"})
        jobs = []
        for job in job_lists:
            job_link_element = job.find(
                "a", class_="_1hr6tkx5 _1hr6tkx7 _1hr6tkxa sx2jih0 sx2jihf zcydq8h"
            )
            job_link = "https://www.jobstreet.com.my" + job_link_element["href"]
            job_title = job_link_element.find("span", class_="sx2jih0").text.strip()
            job_company = job.find(
                "a",
                attrs={
                    "data-automation": "jobCardCompanyLink",
                },
                class_="_6xa4xb0 sx2jih0 sx2jihf rqoqz4",
            )
            if job_company:
                job_company = job_company.text
            else:
                job_company = "Company Confidential"
            job_location = job.find(
                "a",
                attrs={
                    "data-automation": "jobCardLocationLink",
                },
                class_="_6xa4xb0 sx2jih0 sx2jihf rqoqz4",
            ).text.strip()
            post_time = job.find("time", class_="sx2jih0 zcydq84u")
            if post_time:
                post_time = post_time.find("span").text.strip()
            else:
                post_time = ""
            company_image_element = job.find(
                "div",
                attrs={
                    "data-automation": "job-card-logo",
                },
            ).find("img")
            if company_image_element:
                company_logo_url = company_image_element["src"]
            else:
                company_logo_url = None
            # print(company_logo_url)

            jobs.append(
                {
                    "job_title": job_title,
                    "job_company": job_company,
                    "job_location": job_location,
                    "post_time": post_time,
                    "job_link": job_link,
                    "company_logo_url": company_logo_url,
                }
            )
        return jobs
    except Exception as e:
        # TODO: send me an email
        pass


def linkedin_jobs_scraped():
    try:
        response = requests.get(
            "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=&location=Malaysia&locationId=&geoId=106808692&f_TPR=r86400&position=1&pageNum=0&start=0"
        )
        soup = BeautifulSoup(response.content, "html.parser")
        jobs_list = soup.find_all(
            "div",
            class_="base-card relative w-full hover:no-underline focus:no-underline base-card--link base-search-card base-search-card--link job-search-card",
        )
        jobs = []
        for job in jobs_list:
            job_title = job.find("h3", class_="base-search-card__title").text.strip()
            job_company = job.find("a", class_="hidden-nested-link").text.strip()
            job_location = job.find(
                "span", class_="job-search-card__location"
            ).text.strip()
            post_time_element = job.find(
                "time", class_="job-search-card__listdate--new"
            )
            if post_time_element:
                post_time = post_time_element.text.strip()
            else:
                post_time = ""
            access_link_element = job.find(
                "a",
                class_="base-card__full-link absolute top-0 right-0 bottom-0 left-0 p-0 z-[2]",
            )
            job_link = access_link_element["href"]
            company_logo_element = job.find(
                "img", class_="artdeco-entity-image artdeco-entity-image--square-4"
            )
            if company_logo_element:
                company_logo_url = company_logo_element["data-delayed-url"]
            else:
                company_logo_url = None
            print(company_logo_url)
            jobs.append(
                {
                    "job_title": job_title,
                    "job_company": job_company,
                    "job_location": job_location,
                    "post_time": post_time,
                    "job_link": job_link,
                    "company_logo_url": company_logo_url,
                }
            )
        return jobs
    except Exception as e:
        # TODO: send me an email
        pass
