function timeUpdate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay(timestamp)];
  let hours = date.getHours(timestamp);
  if (hours < 10) {
    `0${hours}`;
  }
  let minutes = date.getMinutes(timestamp);
  if (minutes < 10) {
    `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function monthUpdate(timestamp) {
  let date = new Date(timestamp);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = date.getDate(timestamp);
  let month = months[date.getMonth(timestamp)];
  return `${day}, ${month}`;
}

function getTemperature(response) {
  // Remove next line
  // console.log(response.data);
  let temperature = document.querySelector("#temperature-today");
  temperatureCelsius = response.data.main.temp;
  temperature.innerHTML = Math.round(temperatureCelsius);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let description = document.querySelector("#main-description");
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let weekdayHour = document.querySelector("#weekday-hour");
  weekdayHour.innerHTML = timeUpdate(response.data.dt * 1000);
  let dayMonth = document.querySelector("#day-month");
  dayMonth.innerHTML = monthUpdate(response.data.dt * 1000);
  let iconToday = document.querySelector("#icon-today");
  iconToday.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconToday.setAttribute("alt", response.data.weather[0].main);
}

function updateCity(city) {
  let apiKey = "f2741c2d8db0d12b06b1e9b5fcfef6a1";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getTemperature);
}

function submitHandle(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  updateCity(cityName.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitHandle);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f2741c2d8db0d12b06b1e9b5fcfef6a1";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getTemperature);
}

function handleClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", handleClick);

// Daqui em diante ainda não funciona - Em desenvolvimento

function showTemperatureFahrenheit(event) {
  event.preventDefault();
  console.log(returnCelsius.text);
  returnCelsius.classList.remove("active");
  temperatureFahrenheit.classList.add("active");
  let temperature = document.querySelector("#temperature-today");
  let temperatureConvertFahrenheit = (temperatureCelsius * 9) / 5 + 32;
  temperature.innerHTML = Math.round(temperatureConvertFahrenheit);
}

let temperatureCelsius = null;

let temperatureFahrenheit = document.querySelector("#fahrenheit");
temperatureFahrenheit.addEventListener("click", showTemperatureFahrenheit);

function showTemperatureCelsius(event) {
  event.preventDefault();
  returnCelsius.classList.add("active");
  temperatureFahrenheit.classList.remove("active");
  let temperature = document.querySelector("#temperature-today");
  temperature.innerHTML = Math.round(temperatureCelsius);
}

let returnCelsius = document.querySelector("#celsius");
returnCelsius.addEventListener("click", showTemperatureCelsius);

// Para começar com alguma cidade - Pré-definição LISBOA
updateCity("Lisbon");
