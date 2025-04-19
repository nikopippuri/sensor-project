from flask import Flask, request, send_from_directory, jsonify
from dotenv import load_dotenv
import requests
import os

# Lataa .env-tiedosto

load_dotenv()  
api_key = os.getenv("API_KEY")

# Flask alkumääritys

app = Flask(__name__, static_folder='../frontend', static_url_path='')

# Tämä näyttää index.html kun vieraillaan "/"

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Haetaan data frontendille ja pidetään api piilossa

@app.route("/weather")
def get_weather():
    city = request.args.get("city", "Helsinki")
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={api_key}&lang=fi"
    response = requests.get(url)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
