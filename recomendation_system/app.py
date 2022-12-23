import pandas as pd
from flask import Flask, request, jsonify
# from flask_ngrok2 import run_with_ngrok
import pickle
import jsonpickle
from dotenv import load_dotenv
import os

load_dotenv()  # take environment variables from .env.

data = pickle.load(open('recomendation_system/models/data_model.pkl', 'rb'))
cosine_sim_df = pickle.load(open('recomendation_system/models/similarity.pkl', 'rb'))
AUTH_TOKEN = os.getenv("AUTH_TOKEN")

app = Flask(__name__)

class Reading:
   def __init__(self, id, n, w, t, r, tr, px, pm):
       self.id = id
       self.name = n
       self.writer = w
       self.thumbnail = t
       self.rating = r
       self.total_review = tr
       self.price_max = px
       self.price_min = pm

def reading_list(df:pd.DataFrame)->list:
  return list(map(lambda x:Reading(id=x[1], n=x[0], w=x[2], t=x[3], r=x[4], tr=x[5], px=x[6], pm=x[7]),df.values.tolist()))
  
@app.route('/')
def home():
  return 'Rekomendasi Sistem See Book'

@app.route('/v1/books/recomendation',methods=['POST'])
def book_recommendations():
    book_id = request.form.get('book_id')
    similarity_data=cosine_sim_df
    items=data[['id', 'name', 'writer', 'thumbnail', 'rating', 'total_review', 'price_max', 'price_min', 'synopsis']]
    k=10
    
    try:
      # Mengambil data dengan menggunakan argpartition untuk melakukan partisi secara tidak langsung sepanjang sumbu yang diberikan    
      # Dataframe diubah menjadi numpy
      # Range(start, stop, step)
      index = similarity_data.loc[:,book_id].to_numpy().argpartition(range(-1,-k,-1))
      # Mengambil data dengan similarity terbesar dari index yang ada
      closest = similarity_data.columns[index[-1:-(k+2):-1]]
      
      # Drop id_buku agar buku yang digunakan sebagai pencarian tidak muncul dalam daftar rekomendasi
      closest = closest.drop(book_id, errors='ignore')
      
      response = app.response_class(
        response=jsonpickle.encode(reading_list(pd.DataFrame(closest).merge(items).head(k))),
        status=200,
        mimetype='application/json'
      )
    except:
      response = jsonify(status='error', message='data not found')
    
    return response

if __name__ == "__main__":
  # run_with_ngrok(app=app, auth_token=AUTH_TOKEN)
  app.run()