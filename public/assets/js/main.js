// weather app javascript

//register service-worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(serviceWorker => {
      console.log("Service Worker registered: ", serviceWorker);
    })
    .catch(error => {
      console.error("Error registering the Service Worker: ", error);
    });
}
navigator.serviceWorker.onmessage = event => {
  const message = JSON.parse(event.data);
  if (message && message.type.includes("/data/2.5/")) {
    console.log("New Weather location data", message.data)
    //showForecast(message.data)
  }
};
//load handlers
window.addEventListener("load", function () {
  //mapping stats containers
  var locationName = document.getElementById("location_name");
  var locationCode = document.getElementById("location_code");
  var date = document.getElementById("date");
  var time = document.getElementById("time");
  var description = document.getElementById("description");
  var temp = document.getElementById("temp");
  var minTemp = document.getElementById("min_temp");
  var maxTemp = document.getElementById("max_temp");
  var feelsLike = document.getElementById("feels_like");
  var statsImage = document.getElementById("stats_image");
  var iconUrl;
  var cloudiness = document.getElementById("cloudiness");
  var windSpeed = document.getElementById("wind_speed");
  var windDir = document.getElementById("wind_dir");
  var humidity = document.getElementById("humidity");
  var pressure = document.getElementById("pressure");
  var weatherCond = document.getElementById("weather_cond");
  var visibility = document.getElementById("visibility");
  var searchForm = document.getElementById("search_form");

  function getForecast(location) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        localStorage.setItem(location, JSON.stringify(response));
        showForecast(response);
      }
    };
    xhttp.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/weather?q=` +
      location +
      `&units=metric&APPID=dd8fd220b843b73b78411eeae3a562eb`,
      true
    );
    xhttp.send();
  }

  function showForecast(statistics) {
    locationName.innerHTML = statistics.name;
    locationCode.innerHTML = statistics.sys.country;
    date.innerHTML = new Date(statistics.dt * 1000).toDateString();
    time.innerHTML = new Date(statistics.dt * 1000).toLocaleTimeString();
    description.innerHTML = statistics.weather[0].description;
    temp.innerHTML = statistics.main.temp;
    minTemp.innerHTML = statistics.main.temp_min;
    maxTemp.innerHTML = statistics.main.temp_max;
    feelsLike.innerHTML = statistics.main.feels_like;
    iconUrl =
      "https://openweathermap.org/img/wn/" +
      statistics.weather[0].icon +
      "@2x.png";
    statsImage.setAttribute("src", iconUrl);
    cloudiness.innerHTML = statistics.clouds.all;
    windSpeed.innerHTML = statistics.wind.speed;
    windDir.innerHTML = statistics.wind.deg;
    humidity.innerHTML = statistics.main.humidity;
    pressure.innerHTML = statistics.main.pressure;
    weatherCond.innerHTML = statistics.weather[0].main;
    visibility.innerHTML = statistics.visibility;
  }

  function searchForecast(event) {
    event.preventDefault();
    let searchLocationName = document.getElementById("search_field").value;
    console.log(searchLocationName);
    let fetchedStats = JSON.parse(localStorage.getItem(searchLocationName));
    console.log("logginfs", fetchedStats);
    if (fetchedStats == null) {
      getForecast(searchLocationName);
    } else if (fetchedStats.name == searchLocationName) {
      showForecast(fetchedStats);
    } else {
      getForecast(searchLocationName);
    }
  }

  //default gets forecast for Bamenda Cameroon
  searchForm.addEventListener("submit", searchForecast);
});
