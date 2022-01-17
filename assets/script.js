var apiKey = "&appid=10f55498923b2e73e6958bb7868b041c";
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=";
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
   searchedCity.addEventListener("click", function () {
      displayFiveDay(this.id);
   });
   citiesListArea.appendChild(searchedCity);
   cityList.push(city);
   localStorage.setItem("cityList", JSON.stringify(cityList));
   counter++;
}

function loadSavedCities() {
   cityList = JSON.parse(localStorage.getItem("cityList")) || [];
   for (var i = 0; i < cityList.length; i++);
   var searchedCity = document.createElement("button");
   searchedCity.setAttribute("id", cityList);
   searchedCity.className = "city-button";
   searchedCity.textContent = city;
   searchedCity.addEventListener("click", function () {
      displayCity(this.id);
   });
   citiesListArea.appendChild(searchedCity);
}

function displayWeather(data) {
   var forecast = document.getElementById("forecast");
   forecast.innerHTML = "<h3>5-Day Forecast</h3>";
   var row = document.createElement("div");
   row.classList = "row";
   forecast.appendChild(row);

   for (i = 0; i < 5; i++) {
      var card = document.createElement("div");
      var date = document.createElement("div");
      var imageIcon = document.createElement("img");
      var temp = document.createElement("div");
      var wind = document.createElement("div");
      var humidity = document.createElement("div");

      card.className = "card column is-one-fifth has-background-info-dark has-text-white-ter";

      var weatherImage = 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + ".png";
      imageIcon.setAttribute('src', weatherImage);

   

      date.textContent = moment().add(i + 1, 'days').format(' MM/DD/YY');
      temp.textContent = "Temp: " + data.daily[i].temp.day + " F";
      wind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
      humidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

      card.appendChild(date);
      card.appendChild(imageIcon);
      card.appendChild(temp);
      card.appendChild(wind);
      card.appendChild(humidity);
      row.appendChild(card);
   }
}

function displayFiveDay(searchedCity) {
   if (!searchedCity) {
      return false;
   }
   fetch(weatherUrl + searchedCity + apiKey)
      .then(function (response) {
         return response.json();
      }).then(function (data) {
         var cityName = data.name;
         var latitude = data.coord.lat;
         var longitude = data.coord.lon;
         fetch(oneCallApi + latitude + "&lon=" + longitude + exclude + apiKey)
            .then(function (response) {
               return response.json();
            }).then(function (data) {
               console.log(data);
               var imageWeather = document.createElement('img');
               var iconUrl = "http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
               imageWeather.setAttribute("src", iconUrl);

               var temperature = data.current.temp;
               var wind = data.current.wind_speed;
               var humidity = data.current.humidity;
               var uvIndex = data.current.uvi;

               document.getElementById("city").textContent = cityName + moment().format(' (MM/DD/YY)') + " ";
               document.getElementById("city").appendChild(imageWeather);
               document.getElementById("temperature").textContent = "Temp: " + temperature + " F";
               document.getElementById("wind").textContent = "Wind: " + wind + " MPH";
               document.getElementById("humidity").textContent = "Humidity: " + humidity + "%";
               document.getElementById("uv-index").textContent = "UV Index: ";


               var uvBox = document.createElement("div");
               uvBox.setAttribute("id", "uv-box");
               uvBox.textContent = uvIndex;
               document.getElementById("uv-index").appendChild(uvBox);

               // changes color of UV Index Box based on Value
               if (uvIndex < 3) {
                  document.getElementById("uv-box").style.backgroundColor = "green";
               } else if (uvIndex < 6) {
                  document.getElementById("uv-box").style.backgroundColor = "yellow";
               } else if (uvIndex < 8) {
                  document.getElementById("uv-box").style.backgroundColor = "orange";
               } else if (uvIndex < 11) {
                  document.getElementById("uv-box").style.backgroundColor = "red";
               } else {
                  document.getElementById("uv-box").style.backgroundColor = "violet";
               }

               displayWeather(data);
            })
           
      });

   document.getElementById("the-city").value = "";
}

// // // need to display the weather forecast at the top



searchButton.addEventListener("click", function () {
   var cityName = document.getElementById("the-city").value;
   displayFiveDay(cityName);
   saveCities(cityName);
   console.log(cityName);
});
// // //