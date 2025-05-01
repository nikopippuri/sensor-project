from flask import Flask, request, send_from_directory, jsonify
from dotenv import load_dotenv
import requests
import os
import Adafruit_DHT
import subprocess

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

# Haetaan todelliset arvot kayttaen sensoreita

@app.route("/sensor-data")
def sensor_data():
    sensor = Adafruit_DHT.DHT11
    gpio_pin = 17

    humidity, temperature = Adafruit_DHT.read_retry(sensor, gpio_pin, retries=5, delay_seconds=1)

    if humidity is not None and temperature is not None:
        return jsonify({
            "temperature": round(temperature, 1),
            "humidity": round(humidity, 1)
        })
    else:
        return jsonify({"error": "Sensor reading failed"}), 500
    
@app.route("/ilmastointi", methods=["POST"])
def kaynnista_ilmastointi():
    ir_file = "power_signal.ir"
    device = "/dev/lirc1"

    try:
        subprocess.run(["ir-ctl", "-d", device, "-s", ir_file], check=True)
        return jsonify({"status": "success", "message": "Ilmastointilaite käynnistetty"})
    except subprocess.CalledProcessError as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)
