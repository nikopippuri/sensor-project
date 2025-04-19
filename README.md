# 🌡️ Indoor & Outdoor Temperature Monitor with Raspberry Pi

A simple web-based temperature dashboard built with Flask and vanilla JavaScript. The system fetches **outdoor weather data** from OpenWeatherMap and reads **indoor temperature and humidity** using a DHT11 sensor connected to a **Raspberry Pi 3 B+**.

---

## 🛠️ Technologies Used

- 🐍 **Python 3 + Flask** – backend
- 🌐 **HTML + CSS + JavaScript** – frontend
- 🌡️ **DHT11 sensor** – for indoor temperature & humidity
- ☁️ **OpenWeatherMap API** – for real-time weather data
- 🐙 **Raspberry Pi 3 B+** – running the full stack
- 📦 **python-dotenv** – for environment variable management

---

## 🔧 Hardware
-   Raspberry Pi 3 B+

-   DHT11 sensor (connected to GPIO)

-   Jumper wires

---

## 🔥 Features

- Fetches current **outdoor weather** data for a chosen city
- Reads **indoor temperature and humidity** via GPIO
- Highlights temperature and starts air conditioner if it exceeds user-defined threshold.
- Saves city and alert limit to **localStorage**
- Simple **responsive UI** accessible via desktop or mobile browser
- `.env` file used to keep API keys secure

---

## 🚀 Getting Started

1. **Clone repository and install dependencies**  
   ```
   git clone // REPO //
   cd // REPO // 
   pip install -r requirements.txt

2. **🧪 Create the .env file**
    In the root of the project:
    ```
    nano .env

    ```
    Add your API key:
    ```
    API_KEY=your_openweather_api_key_here

    ```
    Save and exit: Ctrl + X, then Y, then Enter

3.  **📦 Install required dependencies**

    Python (Backend)
    ```
    sudo apt update
    sudo apt install python3 python3-pip python3-venv git -y
    pip3 install flask python-dotenv adafruit-circuitpython-dht
    sudo apt install libgpiod2
    ```
    ⚠️ libgpiod2 is required for DHT sensor GPIO access.

    Node/NPM (optional, if using frontend build tools)
    ```

    sudo apt install npm -y
4.  **🚀 Start the application**
    ```
    cd backend
    python3 app.py

5. **Open in browser**

    and visit:
    ```
    http://localhost:5003

## Sensor Wiring

    Sensor Pin | Raspberry Pi GPIO
-    " + " | 5V (Pin 2 or 4)
-    " Out (S) " | GPIO17 (Pin 11)
-    " - " | GND (Pin 6)

## 📸 Screenshots
-   Kytkentäkaavio
-   Mobiili
-   Desktoop

## 📝 License
-   MIT License
    


