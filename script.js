const weatherEl = document.getElementById("weather");
const input = document.getElementById("location");

function getWeather(lat, lon) {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    "&current=temperature_2m" +
    "&daily=temperature_2m_max,temperature_2m_min" +
    "&temperature_unit=fahrenheit" +
    "&timezone=auto";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const temp = Math.round(data.current.temperature_2m);
      const high = Math.round(data.daily.temperature_2m_max[0]);
      const low = Math.round(data.daily.temperature_2m_min[0]);

      weatherEl.textContent =
        `${temp}°F · High ${high} / Low ${low}`;
    })
    .catch(() => {
      weatherEl.textContent = "Unable to load weather";
    });
}

function lookupCity(query) {
  const url =
    "https://geocoding-api.open-meteo.com/v1/search" +
    `?name=${encodeURIComponent(query)}` +
    "&count=1" +
    "&language=en" +
    "&format=json";

  weatherEl.textContent = "Loading...";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        weatherEl.textContent = "Location not found";
        return;
      }

      const place = data.results[0];
      getWeather(place.latitude, place.longitude);
    })
    .catch(() => {
      weatherEl.textContent = "Location lookup failed";
    });
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter" && input.value.trim()) {
    lookupCity(input.value.trim());
  }
});
