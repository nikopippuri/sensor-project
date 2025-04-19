// SIVUN LATAUS

function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.querySelector("main").innerHTML = html;
      if (page === "settings") loadSettingsLogic();
      if (page === "live") fetchWeatherData();
    })
    .catch(err => {
      document.querySelector("main").innerHTML = `<p>Virhe sivun latauksessa</p>`;
      console.error("Sivun latausvirhe:", err);
    });
}

// ASETUKSIEN LOGIIKKA

function loadSettingsLogic() {
  const form = document.getElementById("settings-form");
  if (!form) return;

  const savedCity = localStorage.getItem("weatherCity");
  const savedLimit = localStorage.getItem("tempLimit");


  if (savedCity) {
    document.getElementById("city").value = savedCity;
  }

  if (savedLimit) {
    document.getElementById("tempLimit").value = savedLimit;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const city = document.getElementById("city").value;
    const tempLimit = document.getElementById("tempLimit").value;
    localStorage.setItem("weatherCity", city);
    localStorage.setItem("tempLimit", tempLimit);
    alert("Asetukset tallennettu!");
  });

}

// TUUPPAA RASPERRYLTÄ TULEVAT ARVOT 

function fetchSensorData() {
  fetch('/sensor-data')
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        console.error("Virhe sensorin lukemisessa:", data.error);
        return;
      }

      const temp = data.temperature;
      const humidity = data.humidity;
      const air = "ON"; // Oletetaan edelleen että laite on päällä
	const limit = parseFloat(localStorage.getItem("tempLimit"));

      document.getElementById("temperature").textContent = temp;
      document.getElementById("humidity").textContent = humidity;
      document.getElementById("airMachine").textContent = air;


      if (!isNaN(limit) && temp > limit) {
        const tempElement = document.getElementById("temperature");
        tempElement.style.backgroundColor = "#ff4d4d";
        tempElement.style.color = "#fff";
        tempElement.style.padding = "5px";
        tempElement.style.borderRadius = "6px";
        tempElement.style.fontWeight = "bold";
      }
    })
    .catch(err => console.error("Virhe haettaessa sensoridataa:", err));
}


// HAETAAN OPENWEATHERISTA HALUTUN KAUPUNGIN TÄMÄNHETKINEN SÄÄ

function fetchWeatherData() {
  const city = localStorage.getItem("weatherCity") || "Helsinki";

  fetch(`/weather?city=${encodeURIComponent(city)}`)
    .then(response => response.json())
    .then(data => {
      if (data.main) {
//        console.log("Säädatan vastaus:", data);
        fetchSensorData();

        document.getElementById("weather-city").textContent = city;
        document.getElementById("temp").textContent = data.main.temp;
      } else {
        console.error("Säätietoja ei löytynyt:", data);
      }
    })
    .catch(err => console.error("Virhe haettaessa säätietoja:", err));
}


// ALUSTETAAN SIVU

window.addEventListener("DOMContentLoaded", () => {
  loadPage("live");

  document.querySelectorAll("a[data-page]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = e.target.getAttribute("data-page");
      loadPage(page);
      fetchSensorData();
    });
  });
});
