import csv
import psycopg2 
import pandas as pd 
from sqlalchemy import create_engine
from jobspy import scrape_jobs

country = "" # User input
locator = "" # User input
jobTitle = "" # User input

jobs = scrape_jobs(
    site_name=["indeed", "linkedin", "zip_recruiter", "glassdoor"],
    search_term=jobTitle,
    location = locator,
    results_wanted=20,
    hours_old=72, # (only Linkedin/Indeed is hour specific, others round up to days old)
    country_indeed=country,  # only needed for indeed / glassdoor
    
    # linkedin_fetch_description=True # get full description , direct job url , company industry and job level (seniority level) for linkedin (slower)
    # proxies=["208.195.175.46:65095", "208.195.175.45:65095", "localhost"],
    )
print(f"Found {len(jobs)} jobs")
print(jobs.head())
jobs.to_csv("jobs.csv", quoting=csv.QUOTE_NONNUMERIC, escapechar="\\", index=False) # to csv


# Integration to SQL PostGre:

# establish connections 
conn_string = 'postgres://postgres:pass@127.0.0.1/jobwatch-postgres'
  
db = create_engine(conn_string) 
conn = db.connect() 
conn1 = psycopg2.connect( 
    database="jobwatch-postgres",
  user='postgres',  
  password='pass',  
  host='127.0.0.1',  
  port= '5432'
) 
  
conn1.autocommit = True
cursor = conn1.cursor() 
  
# drop table if it already exists 
cursor.execute('drop table if exists jobwatch-final')
  
sql = '''CREATE TABLE jobwatch-final(id, site, job_url, job_url_direct, 
title, company, location, job_type, date_posted, salary_source, interval, min_amount, 
max_amount, currency, is_remote, job_level, job_function, company_industry, listing_type, 
emails, description, company_url, company_url_direct, company_addresses, company_num_employees,
company_revenue, company_description, logo_photo_url, banner_photo_url, ceo_name, ceo_photo_url);'''

#


cursor.execute(sql) 
  
# import the csv file to create a dataframe 
df = pd.read_csv("jobs.csv")
# Create DataFrame
print(df)
  
# converting data to sql 
df.to_sql('jobwatch-final', conn, if_exists= 'replace') 
  
# fetching all rows 
sql1='''select * from jobwatch-final;'''
cursor.execute(sql1) 
for i in cursor.fetchall(): 
    print(i) 
  
conn1.commit() 
conn1.close()