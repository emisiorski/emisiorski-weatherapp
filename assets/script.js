var apiKey = "&cnt=5&appid=10f55498923b2e73e6958bb7868b041c";
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=";
var exclude = "&exclude=minutely,hourly,alerts&units=imperial";

var cityList = [];
var counter = 0;
var searchButton = document.getElementById("search-button");
var citiesListArea = document.querySelector("#saved-cities");

// need to save the search when clicking the submit city button
function saveCities(city) {
   var searchedCity = document.createElement("button");
   searchedCity.setAttribute("id", city);
   searchedCity.className = "city-button";
   searchedCity.textContent = city;
   // searchedCity.addEventListener("click", function () {
   //    displayCity(this.id);
   // });
   citiesListArea.appendChild(searchedCity);
   cityList.push(city);
   localStorage.setItem("cityList", JSON.stringify(cityList));
   counter++;
}


// // // need to display the weather forecast at the top

searchButton.addEventListener("click", function () {
   var cityName = document.getElementById("the-city").value;
   // displayCity(cityName);
   saveCities(cityName);
   console.log(cityName);
});
// // //