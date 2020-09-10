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
        console.log(response);

        locationName.innerHTML = response.name;
        date.innerHTML = new Date(response.dt * 1000).toDateString();
        time.innerHTML = new Date(response.dt * 1000).toLocaleTimeString();
        description.innerHTML = response.weather[0].description;
        temp.innerHTML = response.main.temp;
        minTemp.innerHTML = response.main.temp_min;
        maxTemp.innerHTML = response.main.temp_max;
        feelsLike.innerHTML = response.main.feels_like;
        cloudiness.innerHTML = response.clouds.all;
        windSpeed.innerHTML = response.wind.speed;
        windDir.innerHTML = response.wind.deg;
        humidity.innerHTML = response.main.humidity;
        pressure.innerHTML = response.main.pressure;
        weatherCond.innerHTML = response.weather[0].main;
        visibility.innerHTML = response.visibility;
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