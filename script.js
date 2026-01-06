const lat = 34.05;
const lon = -118.25;

const url = `https://api.open-meteo.com/v1/forecast
  ?latitude=${lat}
  &longitude=${lon}
  &current_weather=true
  &daily=temperature_2m_max,temperature_2m_min
  &timezone=auto`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const temp = Math.round(data.current_weather.temperature);
    const high = Math.round(data.daily.temperature_2m_max[0]);
    const low = Math.round(data.daily.temperature_2m_min[0]);

    document.getElementById("weather").textContent =
      `${temp}°F · High ${high} / Low ${low}`;
  });
