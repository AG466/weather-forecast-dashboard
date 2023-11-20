
let apiKey = "0e03969665ea5e42726942638222f3c0"

let lat = "";  
let lon = "";

let searchBar = $("#search-input");

let weatherNowJumbo = $("<div>").addClass("jumbotron jumbotron-fluid");
let weatherNowContainer = $("<div>").addClass("container");
let weatherNowRow = $("<div>").addClass("row");


let weatherNowCol = $("<div>").css("background-color", "pink");
let weatherNowMapCol = $("<div>");

let weatherNowHeader = $("<h1>");

let weatherNowTempDiv = $("<div>").css("display", "flex");
let weatherNowTempEl = $("<p>");

let weathernNowIcon = $("<img>");

let weatherNowDescription = $("<p>");

let weatherNowWindEl = $("<p>");

let weatherNowHumidityEl = $("<p>");

let j = 6;

let weatherNow = {
    town: "",
    country: "",
    date: "",
    temp: "",
    icon: "",
    description: "",
    wind: "",
    humidity: "",
    lat: "",
    lon: ""
}


let fiveDays = [
    {
        ref: "",
        date: "",
        temp: "",
        icon: "",
        description: "",
        wind: "",
        humidity: "",
    },
    {   ref: "",
        date: "",
        temp: "",
        icon: "",
        description: "",
        wind: "",
        humidity: ""
    },
    {
        ref: "",
        date: "",
        temp: "",
        icon: "",
        description: "",
        wind: "",
        humidity: ""
    },
    {
        ref: "",
        date: "",
        temp: "",
        icon: "",
        description: "",
        wind: "",
        humidity: ""
    },
    {
        ref: "",
        date: "",
        temp: "",
        icon: "",
        description: "",
        wind: "",
        humidity: ""
    
    }
]

let forecast = {
    current : weatherNow,
    fiveDay : fiveDays
}

var history = [];

searchBar.css("width", "60%");
searchBar.css("margin", "auto");

$("#search-form").on("submit", function(event) {
    //1
    forecast.current = weatherNow;
    forecast.fiveDay = fiveDays;


    event.preventDefault();
    let city = $("#search-input").val();
    console.log(city);
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=" + apiKey;
    


    //2
    fetch(queryURL)
    .then(function(response) {
    return response.json(); 
    }
    ).then(function (geographyData) {
        console.log(geographyData);
        lat = geographyData.city.coord.lat;
        console.log(lat);
        lon = geographyData.city.coord.lon;
        console.log(lon);


        //3
        let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=" + apiKey + "&units=metric";
        fetch(weatherUrl)
        .then(function(response) {
            return response.json(); 
            }).then(function (weatherInfo) {

                getCurrentWeather(weatherInfo);
                getFiveDayWeather(weatherInfo);
                console.log(weatherInfo);

                });
            });
        });
    

                // declares a function which will display the 5 day weather forecast
                function getCurrentWeather(weatherObject){

                    $("#map-container").empty();
                    $("#weather-now").empty();
                    $("#five-day-view").empty();
                    j=6;

                    forecast.current.town = weatherObject.city.name;
                    forecast.current.country = weatherObject.city.country;
                    forecast.current.date = dayjs(weatherObject.list[0].dt_txt).format('dddd DD MMMM YYYY HH:mm');
                    forecast.current.temp = weatherObject.list[0].main.temp;
                    forecast.current.icon = "http://openweathermap.org/img/w/" + weatherObject.list[0].weather[0].icon + ".png";
                    forecast.current.description = weatherObject.list[0].weather[0].description;
                    forecast.current.wind = weatherObject.list[0].wind.speed;
                    forecast.current.humidity = weatherObject.list[0].main.humidity;
                    forecast.current.lat = weatherObject.city.coord.lat;
                    forecast.current.lon = weatherObject.city.coord.lon;

                        var mapContainer = $("#map-container").css({width: '500px', height: '400px' });
                        $("<div id='map' style='width: 100%; height: 100%;'></div>").appendTo("#map-container");
                        
                        var map = L.map('map').setView([forecast.current.lat, forecast.current.lon], 13);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        }).addTo(map);


                        weatherNowHeader.text(forecast.current.town + ", " + forecast.current.country + " " + forecast.current.date);
                        weatherNowTempDiv.text(forecast.current.temp + "°C");
                        weathernNowIcon.attr("src", forecast.current.icon);
                        weatherNowDescription.text(forecast.current.description);
                        weatherNowWindEl.text("Wind Speed: " + forecast.current.wind + "m/s");
                        weatherNowHumidityEl.text("Humidity: " + forecast.current.humidity + "%");
                    
                    $("#weather-now").append(weatherNowCol);
                    $("#map-pane").append(weatherNowMapCol);
                   

                    weatherNowCol.append(weatherNowHeader);
                    weatherNowCol.append(weatherNowTempDiv);  
                    weatherNowCol.append(weathernNowIcon);
                    weatherNowCol.append(weatherNowDescription);
                    weatherNowCol.append(weatherNowWindEl);
                    weatherNowCol.append(weatherNowHumidityEl);
                    
                    weatherNowMapCol.append(mapContainer);

                    localStorage.setItem(forecast.current.town, JSON.stringify(forecast));
                    


                    }


                function getFiveDayWeather(weatherObject) {
                let container = $("<div>");
                container.addClass("container");
                container.attr("id", "weather-container");
                $("body").append(container);
                
                
                // let weatherDisplay = $("<div>");
                // weatherDisplay.addClass("justify-content-around");
                
                
                let weatherStats = $("<div>");
                weatherStats.addClass("d-flex flex-wrap justify-content-between p-3");
                weatherStats.addClass("weather-info");


                for (let i = 0; i < 5; i++) {
                    
                    if(j <= 40){

                    let fiveDayDivs = $("<div>");
                    
                    
                    
                    fiveDayDivs.addClass("col-2");
                    fiveDayDivs.addClass("day"+i);
                    fiveDayDivs.addClass("card");
                    
                    forecast.fiveDay[i].ref = "day" + i;
                    
                    
                    let date = $("<p>");
                    forecast.fiveDay[i].date = dayjs(weatherObject.list[j].dt_txt).format('dddd DD MMMM YYYY HH:mm');
                    date.text(forecast.fiveDay[i].date);
                    fiveDayDivs.append(date);
                
                    let temp = $("<p>");
                    forecast.fiveDay[i].temp = Math.round(weatherObject.list[j].main.temp);
                    temp.text(forecast.fiveDay[i].temp + "°C");
                    fiveDayDivs.append(temp);
                
                    let icon = $("<img>");
                    icon.css("width", "50%");
                    forecast.fiveDay[i].icon = weatherObject.list[j].weather[0].icon + ".png";
                    icon.attr("src", "http://openweathermap.org/img/w/" + forecast.fiveDay[i].icon);
                    fiveDayDivs.append(icon);

                    let description = $("<p>");
                    forecast.fiveDay[i].description = weatherObject.list[j].weather[0].description;
                    fiveDayDivs.append(description);

                    let wind = $("<p>");
                    forecast.fiveDay[i].wind ="Wind Speed: " +weatherObject.list[j].wind.speed + "m/s";
                    wind.text(forecast.fiveDay[i].wind);
                    fiveDayDivs.append(wind);

                    let humidity = $("<p>");
                    forecast.fiveDay[i].humidity = "Humidity: " + weatherObject.list[j].main.humidity + "%";
                    humidity.text(forecast.fiveDay[i].humidity);
                    fiveDayDivs.append(humidity);

                    weatherStats.append(fiveDayDivs);
                    $("#five-day-view").append(weatherStats);
                    // $("#five-day-view").append(weatherDisplay);
                    
                    j = j + 7;
                    console.log(j);

                    
                    
                    }
                }


            //     if(history.length ===0 ){
            //         history[]
            //     }else if(history.length > 0 && history.length < 5){
            //         history.unshift(forecast);
            //         localStorage.setItem("history", JSON.stringify(history));
            // } else {
            //     history.pop();
            //     history.unshift(forecast);
            //     localStorage.setItem("history", JSON.stringify(history));
            //     }

            //     renderButton();
            //     }
            


            

            
            function renderButton(){
                for (let i = 0; i < history.length; i++) {
                    let historyButton = $("<button>");
                    historyButton.addClass("btn btn-secondary");
                    historyButton.text(history[i].current.town);
                    historyButton.attr("id", history[i].current.town);
                    $("#search-history").append(historyButton);
                }   
            }

                
        }

        function clearFiveDay(){
            $("#five-day-view").empty();
        }