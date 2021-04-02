// date and time

function formatDate(date) {
    let hours = currentTime.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let weekDay = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    return `${days[weekDay]} ${hours}:${minutes}`;
  }
  
  let dateElement = document.querySelector("#time-display");
  let currentTime = new Date();
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  dateElement.innerHTML = formatDate(currentTime);
  
  let now = new Date();
  let timeStamp = document.querySelector("#time-display");
  
  function showWeather(response) {
    document.querySelector("#city-search").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  
    document.querySelector("#humidity").inneHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-search").value;
    searchCity(city);
  }
  
  function search(event) {
    event.preventDefault();
    let city = document.querySelector("#city-search").value;
    let units = "metric";
    let apiKey = "67e1b70fca1fc773ae09a0b45df7abc6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function retrievePosition(position) {
    let apiKey = "67e1b70fca1fc773ae09a0b45df7abc6";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
    let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
  }
  
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 40;
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 19;
  }
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);
  