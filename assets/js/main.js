// weather app javascript
window.addEventListener("load", function () {
  function getWeather() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);
      }
    };
    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=dd8fd220b843b73b78411eeae3a562eb`, true);
    xhttp.send();
  }

  // getWeather();

  let searchForm = document.getElementById("search_form");
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let cityName = document.getElementById("search_field").value;
    console.log(cityName)

  });

});