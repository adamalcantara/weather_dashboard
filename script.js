var apiKey = "371201dc0173d4e3e8307cc1abf9c509";
var searchBtn = document.querySelector("#search-button");



function searchValue () {
    var searchValue = document.querySelector("#search-value").value;
    console.log(searchValue);
    getWeather(searchValue);
    fiveDayForecast(searchValue);
}

function getWeather (searchValue) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey + "&units=imperial";
    //set up validation if form is blank
    fetch(apiURL)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data);
            //append content to the DOM here OR with a function
            //call five day forecast
        })
        
}

function fiveDayForecast (searchValue) {
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + apiKey + "&units=imperial";
    fetch(fiveDayURL)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data);
        })
    
}

searchBtn.addEventListener("click", searchValue);