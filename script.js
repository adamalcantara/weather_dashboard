//set global variables
var apiKey = "371201dc0173d4e3e8307cc1abf9c509";
var searchBtn = document.querySelector("#search-button");
var todayEl = document.getElementById("today");
var historyEl = document.getElementById("history");
var forecast = document.getElementById("forecast");

//function to set the value of the search box
function searchValue() {
    var searchValue = document.querySelector("#search-value").value;
    console.log(searchValue);

    var city = JSON.parse(localStorage.getItem("city")) || [];
    console.log("city:", city);

    console.log(`city includes searchValue: ${city.includes(searchValue)}`)

    if (!city.includes(searchValue)) {
        city.unshift(searchValue);
        localStorage.setItem("city", JSON.stringify(city));
        saveSearch();
    }
    getWeather(searchValue);
    fiveDayForecast(searchValue);
    
}

//function to save the search term
function saveSearch() {
    historyEl.innerHTML = "";
    var city = JSON.parse(localStorage.getItem("city")) || [];
    console.log(city)
    for (var i = 0; i < city.length; i++) {
        var previous = document.createElement("button");
        previous.setAttribute("data-city", city[i]);
        previous.textContent = city[i];
        previous.addEventListener("click", function() {
            getWeather(this.getAttribute("data-city"));
            fiveDayForecast(this.getAttribute("data-city"));
        });
        historyEl.appendChild(previous);
    }
}



function getWeather(searchValue) {
    todayEl.innerHTML = "";
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

            var iconUrl = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
            var iconItem = document.createElement("img")
            iconItem.setAttribute("src", iconUrl);

            var cityNameEl = document.createElement("h1");
            $(cityNameEl).text(cityName + " " + dateEl);
            todayEl.append(cityNameEl);

            todayEl.append(iconItem);
            

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
    console.log("hello it's me")
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + apiKey + "&units=imperial";
    fetch(fiveDayURL)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data);

            

            forecast.innerHTML = "";

        for (var i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.indexOf('15:00:00') !== -1){
                
                var todayDate = moment().add(1, 'days').calendar();
                var dateFive = todayDate;
                var iconUrl = "http://openweathermap.org/img/wn/" + data.list[6].weather[0].icon + ".png";
                var temperatureFive = "Temp: " + data.list[6].main.temp + "°F";
                var windFive = "Wind: " + data.list[6].wind.speed + "MPH";
                var humidityFive = "Humidity: " + data.list[6].main.humidity + "%";

                var cardEl = document.createElement("div");
                cardEl.classList.add("card")

                var dateFiveEl = document.createElement("h5");
                dateFiveEl.textContent = dateFive;
                cardEl.append(dateFiveEl);

                var iconFiveEl = document.createElement("img");
                iconFiveEl.setAttribute("src", iconUrl);
                cardEl.append(iconFiveEl);

                var tempFiveEl = document.createElement("p");
                tempFiveEl.textContent = temperatureFive;
                cardEl.append(tempFiveEl);

                var windFiveEl = document.createElement("p");
                windFiveEl.textContent = windFive;
                cardEl.append(windFiveEl);

                var humidityFiveEl = document.createElement("p");
                humidityFiveEl.textContent = humidityFive;                
                cardEl.append(humidityFiveEl);

                forecast.append(cardEl);
            }
        }

        })

}


searchBtn.addEventListener("click", searchValue);

saveSearch();
