import pandas as pd 
from sqlalchemy import create_engine
from jobspy import scrape_jobs

country = "Ireland" # User input
locator = "Dublin" # User input
jobTitle = "Software Engineer" # User input

data = scrape_jobs(
    site_name=["indeed", "linkedin", "zip_recruiter", "glassdoor"],
    search_term=jobTitle,
    location = locator,
    results_wanted=20,
    hours_old=72, # (only Linkedin/Indeed is hour specific, others round up to days old)
    country_indeed=country,  # only needed for indeed / glassdoor
    
    # linkedin_fetch_description=True # get full description , direct job url , company industry and job level (seniority level) for linkedin (slower)
    # proxies=["208.195.175.46:65095", "208.195.175.45:65095", "localhost"],
    )
df = pd.DataFrame(data)
print(f"Found {len(data)} jobs")
# jobs.to_csv("jobs.csv", quoting=csv.QUOTE_NONNUMERIC, escapechar="\\", index=False) # to csv