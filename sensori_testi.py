import Adafruit_DHT

sensor = Adafruit_DHT.DHT11
gpio_pin = 17  # Vaihda jos käytät toista GPIO-pinniä

humidity, temperature = Adafruit_DHT.read_retry(sensor, gpio_pin)

if humidity is not None and temperature is not None:
    print(f"Lämpötila: {temperature:.1f} °C")
    print(f"Kosteus: {humidity:.1f} %")
else:
    print("Anturin lukeminen epäonnistui.")
