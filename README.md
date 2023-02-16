> **Warning**
> The job postings displayed in the web application are scraped from various third-party websites. This application is intended for personal project, education purposes and not commercial intended. I do not guarantee the accuracy or completeness of the job postings and recommend that users verify the information directly with the respective website.
# Job Search Engine
Full stack web application based on Django and React, scrapes job postings from various websites and stores them in a unified format in our database with periodic updates. The app also recommends job postings based on user's desired job and location, providing a convenient way for job seekers to browse multiple websites in a single platform. Our system aims to make the job search process more efficient and effective by providing a centralized platform for job postings and personalized recommendations.

## Usage

```python
# create a .env file under server folder and 
# fill up the with the following data
SECRET_KEY=your secret key
ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
DEBUG=True

DB_ENGINE=django.db.backends.postgresql_psycopg2
DB_NAME=job_search_engine
DB_USER=postgres
DB_PASSWORD=12344321
DB_HOST=db
DB_PORT=5432
DATABASE=postgres

EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_USE_TLS=True
EMAIL_PORT=587
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=your user
EMAIL_HOST_PASSWORD=your app password

# back to the root location, and type the command
docker-compose up -d --build
```
> **Note**
> The job posts will only be scraped after 1 hour since the celery-beat periodic task had been set to periodically execute the scrape task every 1 hour.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)