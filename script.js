const apiKey = "6d8aca8d50607fafb6eab0b21a73f5de";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temp');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('Weather data not available for the provided city');
    }
    const data = await response.json();
    console.log(data);
    cityElement.innerHTML = data.name;
    tempElement.innerHTML = (data.main.temp).toFixed(0) + "°C";
    humidityElement.innerHTML = data.main.humidity;
    windElement.innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds") {
      weatherIcon.src = "icons/partly-cloudy.png";
    } else if(data.weather[0].main == "Clear") {
      weatherIcon.src = "icons/sun.png";
    } else if(data.weather[0].main == "Rain") {
      weatherIcon.src = "icons/raining.png";
    } else if(data.weather[0].main == "Drizzle") {
      weatherIcon.src = "icons/drizzle.png";
    } else if(data.weather[0].main == "Mist") {
      weatherIcon.src = "icons/mist.png";
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
  document.querySelector('.weather').style.display = "block";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
