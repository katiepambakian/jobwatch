import csv
import psycopg2 
import pandas as pd 
from sqlalchemy import create_engine
from jobspy import scrape_jobs

country = "Ireland" # User input
locator = "Dublin" # User input
jobTitle = "Software Engineer" # User input

df = scrape_jobs(
    site_name=["indeed", "linkedin", "zip_recruiter", "glassdoor"],
    search_term=jobTitle,
    location = locator,
    results_wanted=20,
    hours_old=72, # (only Linkedin/Indeed is hour specific, others round up to days old)
    country_indeed=country,  # only needed for indeed / glassdoor
    
    # linkedin_fetch_description=True # get full description , direct job url , company industry and job level (seniority level) for linkedin (slower)
    # proxies=["208.195.175.46:65095", "208.195.175.45:65095", "localhost"],
    )
print(f"Found {len(df)} jobs")
# jobs.to_csv("jobs.csv", quoting=csv.QUOTE_NONNUMERIC, escapechar="\\", index=False) # to csv


# Integration to SQL PostGre:


"""""""""
# establish connections 
conn_string = 'postgres://default:mtW4LgAYVk7S@ep-silent-block-a2ivytpf-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require'
  
db = create_engine(conn_string) 
conn = db.connect() 
conn1 = psycopg2.connect( 
    database="verceldb",
  user='default',  
  password='mtW4LgAYVk7S',  
  host='ep-silent-block-a2ivytpf-pooler.eu-central-1.aws.neon.tech',  
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

cursor.execute(sql) 
  
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
"""""""""


import psycopg2 
import psycopg2.extras as extras 
import pandas as pd 
  
  
def execute_values(conn, df, table): 
  
    tuples = [tuple(x) for x in df.to_numpy()] 
  
    cols = ','.join(list(df.columns)) 
  
    # SQL query to execute 
    query = "INSERT INTO %s(%s) VALUES %%s" % (table, cols) 
    cursor = conn.cursor() 
    try: 
        extras.execute_values(cursor, query, tuples) 
        conn.commit() 
    except (Exception, psycopg2.DatabaseError) as error: 
        print("Error: %s" % error) 
        conn.rollback() 
        cursor.close() 
        return 1
    print("execute_values() done") 
    cursor.close() 
  
  
# establishing connection 
conn = psycopg2.connect( 
    database="verceldb", 
    user='default', 
    password='mtW4LgAYVk7S', 
    host='ep-silent-block-a2ivytpf-pooler.eu-central-1.aws.neon.tech', 
    port='5432'
) 

"""""""""""""""
POSTGRES_URL="postgres://default:mtW4LgAYVk7S@ep-silent-block-a2ivytpf-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_PRISMA_URL="postgres://default:mtW4LgAYVk7S@ep-silent-block-a2ivytpf-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NO_SSL="postgres://default:mtW4LgAYVk7S@ep-silent-block-a2ivytpf-pooler.eu-central-1.aws.neon.tech:5432/verceldb"
POSTGRES_URL_NON_POOLING="postgres://default:mtW4LgAYVk7S@ep-silent-block-a2ivytpf.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_USER="default"
POSTGRES_HOST="ep-silent-block-a2ivytpf-pooler.eu-central-1.aws.neon.tech"
POSTGRES_PASSWORD="mtW4LgAYVk7S"
POSTGRES_DATABASE="verceldb"
"""""""""""""""

sql = '''CREATE TABLE jobwatch_final(id, site, job_url, job_url_direct, 
title, company, location, job_type, date_posted, salary_source, interval, min_amount, 
max_amount, currency, is_remote, job_level, job_function, company_industry, listing_type, 
emails, description, company_url, company_url_direct, company_addresses, company_num_employees,
company_revenue, company_description, logo_photo_url, banner_photo_url, ceo_name, ceo_photo_url);'''

# creating a cursor 
cursor = conn.cursor() 
cursor.execute(sql) 
data = df
  
data = data["id, site, job_url, job_url_direct, title, company, location, job_type, date_posted, salary_source, interval, min_amount, max_amount, currency, is_remote, job_level, job_function, company_industry, listing_type, emails, description, company_url, company_url_direct, company_addresses, company_num_employees,company_revenue, company_description, logo_photo_url, banner_photo_url, ceo_name, ceo_photo_url"] 
  
# using the function defined 
execute_values(conn, data, 'jobwatch_final') 