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
conn_string = 'postgres://postgres:pass@127.0.0.1/' # Whatever the sql link is. after the slash
  
db = create_engine(conn_string) 
conn = db.connect() 
conn1 = psycopg2.connect( 
    database="", # insert name
  user='postgres',  
  password='pass',  
  host='127.0.0.1',  
  port= '5432'
) 
  
conn1.autocommit = True
cursor = conn1.cursor() 
  
# drop table if it already exists 
cursor.execute('drop table if exists ') # insert name after space
  
sql = '''CREATE TABLE airlines_final(id int , 
day int ,airline char(20),destination char(20));''' # replace with whatever necessary
  
cursor.execute(sql) 
  
# import the csv file to create a dataframe 
df = pd.read_csv("jobs.csv")
# Create DataFrame 
print(df) 
  
# converting data to sql 
df.to_sql('airlines_final', conn, if_exists= 'replace') 
  
# fetching all rows 
sql1='''select * from airlines_final;''' # fix this
cursor.execute(sql1) 
for i in cursor.fetchall(): 
    print(i) 
  
conn1.commit() 
conn1.close()