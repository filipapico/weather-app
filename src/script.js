function getTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector(".temperature-today");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let description = document.querySelector("#main-description");
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "f2741c2d8db0d12b06b1e9b5fcfef6a1";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisboa&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(getTemperature);
