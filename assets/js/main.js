// weather app javascript
window.addEventListener("load", function () {

  //mapping stats containers 

  var locationName = document.getElementById("location_name");
  var date = document.getElementById("date");
  var time = document.getElementById("time");
  var description = document.getElementById("description");
  var temp = document.getElementById("temp");
  var minTemp = document.getElementById("min_temp");
  var maxTemp = document.getElementById("max_temp");
  var feelsLike = document.getElementById("feels_like");
  var statsImage = document.getElementById("stats_image");
  var cloudiness = document.getElementById("cloudiness");
  var windSpeed = document.getElementById("wind_speed");
  var windDir = document.getElementById("wind_dir");
  var humidity = document.getElementById("humidity");
  var pressure = document.getElementById("pressure");
  var weatherCond = document.getElementById("weather_cond");
  var dewPoint = document.getElementById("dew_point");
  var visibility = document.getElementById("visibility");

  ((function getWeather() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        localStorage.setItem("weather_statistics", JSON.stringify(response));
        const WeatherStats = JSON.parse(localStorage.getItem('weather_statistics'));

        locationName.innerHTML = WeatherStats.name;
        date.innerHTML = new Date(WeatherStats.dt * 1000).toDateString();
        time.innerHTML = new Date(WeatherStats.dt * 1000).toLocaleTimeString();
        description.innerHTML = WeatherStats.weather[0].description;
        temp.innerHTML = WeatherStats.main.temp;
        minTemp.innerHTML = WeatherStats.main.temp_min;
        maxTemp.innerHTML = WeatherStats.main.temp_max;
        feelsLike.innerHTML = WeatherStats.main.feels_like;
        cloudiness.innerHTML = WeatherStats.clouds.all;
        windSpeed.innerHTML = WeatherStats.wind.speed;
        windDir.innerHTML = WeatherStats.wind.deg;
        humidity.innerHTML = WeatherStats.main.humidity;
        pressure.innerHTML = WeatherStats.main.pressure;
        weatherCond.innerHTML = WeatherStats.weather[0].main;
        visibility.innerHTML = WeatherStats.visibility;
      }
    };
    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=dd8fd220b843b73b78411eeae3a562eb`, true);
    xhttp.send();
  })());


  let searchForm = document.getElementById("search_form");
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let searchLocationName = document.getElementById("search_field").value;
    console.log(searchLocationName)

  });

});