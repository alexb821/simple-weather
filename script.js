const lat = 34.05;
const lon = -118.25;

const url =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${lat}` +
  `&longitude=${lon}` +
  `&current=temperature_2m,weather_code` +
  `&daily=temperature_2m_max,temperature_2m_min` +
  `&temperature_unit=fahrenheit` +
  `&timezone=auto`;

fetch(url)
  .then(res => {
    if (!res.ok) throw new Error("Network error");
    return res.json();
  })
  .then(data => {
    const temp = Math.round(data.current.temperature_2m);
    const high = Math.round(data.daily.temperature_2m_max[0]);
    const low = Math.round(data.daily.temperature_2m_min[0]);

    document.getElementById("weather").textContent =
      `${temp}°F · High ${high} / Low ${low}`;
  })
  .catch(err => {
    console.error(err);
    document.getElementById("weather").textContent =
      "Unable to load weather";
  });
