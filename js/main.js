console.log("WindScrib v1.0.1");

const base = "https://api.openweathermap.org/data/2.5/";

const API_KEY = "e33607657d15ab134399ef40a1c43892";

const searchbox = document.querySelector('.search-box');

const searchbtn = document.querySelector('.search-btn');

searchbtn.addEventListener("click", setQuery);

function setQuery(e) {
  e.preventDefault();
  if (searchbox.value == " " || searchbox.value === "") {
    alert("field shouldn't be empty")
    return null;
  } else {
    getResults(searchbox.value)
  }

  console.log(searchbox.value);
}

async function getResults(query) {
  // fetch(`${url}weather?q=${query}&units=metric&APPID=${API_KEY}`)
  //   .then(weather => {
  //     return weather.json();
  //   }).then(displayResults);

  const weatherResponse = await fetch(`${base}weather?q=${query}&units=metric&APPID=${API_KEY}`);

  const weatherData = await weatherResponse.json();

  console.log(weatherData)
  // displayResults(weatherData)
  updateSearchReport(weatherData);
}


function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city")
  let latitude = document.querySelector(".location .latitude")
  let longitude = document.querySelector(".location .longitude")
  let humidity = document.querySelector(".location .humidity")
  let pressure = document.querySelector(".location .pressure")
  let speed = document.querySelector(".location .speed")
  let status = document.querySelector(".location .status")
  let temperature = document.querySelector(".location .temperature")
  // let city = document.querySelector(".location .city")
  // let city = document.querySelector(".location .city")
  // let city = document.querySelector(".location .city")
  city.innerText = `City:${weather.name}, ${weather.sys.country}`;
  latitude.innerText = `Latitude: ${weather.coord.lat}`;
  longitude.innerText = `Longitude: ${weather.coord.lon}`;
  humidity.innerText = `Humidity:  ${weather.main.humidity}`;
  pressure.innerText = `Pressure: ${weather.main.pressure}`;
  speed.innerText = `Speed: ${weather.wind.speed}`;
  status.innerText = `Status: ${weather.weather[0].description}`;
  temperature.innerHTML = `Temperature: ${weather.main.temperature}`;
  // city.innerText += `${weather.name}, ${weather.sys.country}`;
  // city.innerText += `${weather.name}, ${weather.sys.country}`;
}





async function getUserGeoLocation() {


  // New Promise
  return new Promise((resolve, reject) => {

    const geoLocation = checkGeoLocation();

    if (geoLocation === null) return reject("Browsers does not have support for geo location");


    geoLocation.getCurrentPosition(
      (position) => {
        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;

        resolve({ lat: Latitude, log: Longitude });
      },
      (err) => {
        if (err.PERMISSION_DENIED) {
          return reject("WindScrib requires your location data to work");
        }
        if (err.POSITION_UNAVAILABLE) {
          return reject("Unable to get current location info");
        }
        return reject(err.message);
      }
    );



  });
}

function checkGeoLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation;
  } else {
    alert("Unable to get geo location information");
    return null;
  }
}

async function getWeatherInfo({ lat, log }) {

  if (!lat || !log) return alert("Location Access Is Required");

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}&units=metric`;

  const weatherResponse = await fetch(url);

  const weatherData = await weatherResponse.json();

  console.log(weatherData);

  updateWeatherReport(weatherData);
}


function getEle(id = "") {
  if (!id) throw "element is required";

  return document.getElementById(id);
}


function updateWeatherReport(data) {

  const lat = data.coord.lat;
  const lon = data.coord.lon;
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const location = data.name + ", " + data.sys.country;
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const speed = data.wind.speed;





  getEle("weather-temp").innerHTML = temp + " <sup>°C</sup>";
  getEle("weather-desc").innerHTML = description;
  getEle("location").innerHTML = location;
  getEle("lat").innerHTML = `Latitude: ${lat}<sup>°</sup>`;
  getEle("lon").innerHTML = `Longitude:  ${lon}<sup>°</sup>`;
  getEle("humidity").innerHTML = `Humidity ${humidity} g.m<sup>-3</sup>`;
  getEle("pressure").innerHTML = `Pressure: ${pressure} Pa`;
  getEle("speed").innerHTML = `Speed:  ${speed} mph`;
  getEle("status").innerHTML = `Status: ${description}`;
  getEle("temperature").innerHTML = `Temperature: ${temp}<sup>°</sup>C`;


}

function updateSearchReport(data) {

  const lat = data.coord.lat;
  const lon = data.coord.lon;
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const location = data.name + ", " + data.sys.country;
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const speed = data.wind.speed;





  // document.querySelector(".temperature").innerHTML += temp + " <sup>°C</sup>";
  getEle("weather-desc").innerHTML = description;
  // getEle("location").innerHTML = location;
  getEle("lat").innerHTML = `Latitude: ${lat}<sup>°</sup>`;
  getEle("lon").innerHTML = `Longitude:  ${lon}<sup>°</sup>`;
  getEle("humidity").innerHTML = `Humidity ${humidity} g.m<sup>-3</sup>`;
  getEle("pressure").innerHTML = `Pressure: ${pressure} Pa`;
  getEle("speed").innerHTML = `Speed:  ${speed} mph`;
  getEle("status").innerHTML = `Status: ${description}`;
  getEle("temperature").innerHTML = `Temperature: ${temp}<sup>°</sup>C`;
  getEle("location").innerHTML = `${location}`


}




getUserGeoLocation().then(getWeatherInfo).catch(alert);
