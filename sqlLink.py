# Integration to SQL PostGre:
import psycopg2
from sqlalchemy import create_engine 
from scraper import df
  
conn_string = 'postgres://default:mtW4LgAYVk7S@ep-silent-block-a2ivytpf-pooler.eu-central-1.aws.neon.tech/verceldb'
  
db = create_engine(conn_string) 
conn = db.connect() 
  
# Create DataFrame 
df.to_sql('data', con=conn, if_exists='replace', 
          index=False) 
conn = psycopg2.connect(conn_string 
                        ) 
conn.autocommit = True
cursor = conn.cursor() 
  
sql1 = '''select * from data;'''
cursor.execute(sql1) 
for i in cursor.fetchall(): 
    print(i) 
  
# conn.commit() 
conn.close()