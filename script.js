var apiKey = "371201dc0173d4e3e8307cc1abf9c509";
var searchBtn = document.querySelector("#search-button");
var todayEl = document.getElementById("today");
var historyEl = document.getElementById("history");
var city = JSON.parse(localStorage.getItem("city")) || [];


function searchValue() {
    var searchValue = document.querySelector("#search-value").value;
    console.log(searchValue);

    if (!city.includes(searchValue)) {
    city.unshift(searchValue);
    localStorage.setItem("city", JSON.stringify(city));
    getWeather(searchValue);
    fiveDayForecast(searchValue);
    saveSearch()
    }

}

function saveSearch() {
    historyEl.innerHTML = "";
    console.log(city)
    for (var i = 0; i < city.length; i++) {
        var previous = document.createElement("button");
        previous.textContent = cities[i];
        historyEl.appendChild(previous)
        
    }
}



function getWeather(searchValue) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey + "&units=imperial";
    //set up validation if form is blank
    fetch(apiURL)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data);
            //append content to the DOM here OR with a function
            //call five day forecast

            var cityName = data.name;
            console.log("city name");
            console.log(cityName);

            var windSpeed = data.wind.speed;

            var temperature = data.main.temp;
            console.log("temperature");
            console.log(temperature);

            var humidity = data.main.humidity;
            console.log("humidity");
            console.log(humidity);

            var dateEl = moment().format("MM/DD/YYYY");

            var cityNameEl = document.createElement("h1");
            $(cityNameEl).text(cityName + " " + dateEl);
            todayEl.append(cityNameEl);

            var temperatureEl = document.createElement("p");
            $(temperatureEl).text("Temp: " + temperature + "°F")
            todayEl.append(temperatureEl);

            var windEl = document.createElement("p");
            $(windEl).text("Wind: " + windSpeed + " MPH");
            todayEl.append(windEl);

            var humidityEl = document.createElement("p");
            $(humidityEl).text("Humidity: " + humidity + " %");
            todayEl.append(humidityEl);

            var longitude = data.coord.lon;
            console.log(longitude);

            var latitude = data.coord.lat;
            console.log(latitude);

            uvIndex(latitude, longitude);

            

            
        })


todayEl.innerHTML = "";

}



function uvIndex(latitude, longitude) {
    var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    fetch(uvURL)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data);

            var uviValue = data.current.uvi;
            console.log(uviValue);

            var uviEl = document.createElement("p");
            $(uviEl).text("UV Index: " + uviValue);
            todayEl.append(uviEl);
        })
}





function fiveDayForecast(searchValue) {
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + apiKey + "&units=imperial";
    fetch(fiveDayURL)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data);
        })

}


searchBtn.addEventListener("click", searchValue);
