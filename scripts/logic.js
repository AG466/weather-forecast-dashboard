
// // let queryURL ="api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0e03969665ea5e42726942638222f3c0";
// let geoURL = "api.openweathermap.org/data/2.5/forecast?q=London&appid=" + apiKey;
let apiKey = "0e03969665ea5e42726942638222f3c0"
// let geoUrl = "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=0e03969665ea5e42726942638222f3c0";

// prevent index.html from reloading when search button is clicked

let lat = "";  
let lon = "";

let searchBar = $("#search-input");

let currentWeatherJumboEl = $("<div>");
let currentWeatherContainerEl = $("<div>");
let currentWeatherRowEl = $("<div>");
let currentWeatherEl = $("<div>");
let currentContainerCol = $("<div>");
let currentMapContainer = $("<div>");
let currentWeatherHeader = $("<h1>");
let currentWeatherTempDiv = $("<div>");
let currentWeatherTemp = $("<p>");
let currentTempIcon = $("<i>");
let currentWeatherIcon = $("<img>");
let currentWeatherDescription = $("<p>");
let currentWeatherWindDiv = $("<div>");
let currentWeatherWind = $("<p>");
let currentWindIcon = $("<i>");
let currentWeatherHumidityDiv = $("<div>");
let currentWeatherHumidity = $("<p>");
let currentHumidityIcon = $("<i>");
let j = 0;

let weatherNow = {
    ref: "",
    date: "",
    temp: "",
    icon: "",
    description: "",
    wind: "",
    humidity: ""
}


let fiveDays = [
    {
        ref: "",
        date: "",
        temp: "",
        icon: "",
        description: "",
        wind: "",
        humidity: ""
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
                    currentWeatherJumboEl.addClass("jumbotron jumbotron-fluid");
                    currentWeatherContainerEl.addClass("container");
                    currentWeatherRowEl.addClass("row");
    
                    currentWeatherEl.addClass("col-2");
    
                    currentContainerCol.addClass("col-5");
                    currentContainerCol.css("background-color", "pink");
    
                    currentMapContainer.addClass("col-5");
                    currentMapContainer.attr("id", "map-grid-container");
    
                    currentTempIcon.addClass("bi bi-thermometer-half");
                    currentWeatherTempDiv.append(currentTempIcon," ", currentWeatherTemp);
                    currentWeatherTempDiv.css("display", "flex");
                    
                    currentWindIcon.addClass("bi bi-wind");
                    currentWeatherWindDiv.append(currentWindIcon," ", currentWeatherWind);
                    currentWeatherWindDiv.css("display", "flex");
    
                    currentHumidityIcon.addClass("bi bi-droplet");
                    currentWeatherHumidityDiv.append(currentHumidityIcon," ", currentWeatherHumidity);
                    currentWeatherHumidityDiv.css("display", "flex");
                    
    
                    let weatherNow = weatherObject.list[0].dt_txt;
                    currentWeatherHeader.text(weatherObject.city.name + ", (" + weatherObject.city.country + ") " + dayjs(weatherNow).format('dddd DD MMMM YYYY HH:mm'));
                    currentWeatherTemp.text(weatherObject.list[0].main.temp);
                    currentWeatherIcon.attr("src", "http://openweathermap.org/img/w/" + weatherObject.list[0].weather[0].icon + ".png");
                    currentWeatherDescription.text(weatherObject.list[0].weather[0].description);
                    currentWeatherWind.text(weatherObject.list[0].wind.speed);
                    currentWeatherHumidity.text(weatherObject.list[0].main.humidity);
    
                        var mapContainer = $("#map-container").css({width: '500px', height: '400px' });
                        $("<div id='map' style='width: 100%; height: 100%;'></div>").appendTo("#map-container");
                        
                        var map = L.map('map').setView([lat, lon], 13);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        }).addTo(map);
                    
    
                    currentContainerCol.append(currentWeatherHeader);
                    currentContainerCol.append(currentWeatherTempDiv);
                    currentContainerCol.append(currentWeatherIcon);
                    currentContainerCol.append(currentWeatherDescription);
                    currentContainerCol.append(currentWeatherWindDiv);
                    currentContainerCol.append(currentWeatherHumidityDiv);
                    currentMapContainer.append(mapContainer);
                    currentWeatherRowEl.append(currentWeatherEl);
                    currentWeatherRowEl.append(currentContainerCol);
                    currentWeatherRowEl.append(currentMapContainer);
                    currentWeatherContainerEl.append(currentWeatherRowEl);
                    currentWeatherJumboEl.append(currentWeatherContainerEl);
    
                    $("body").append(currentWeatherJumboEl);
                    }
    






                function getFiveDayWeather(weatherObject) {
                let container = $("<div>");
                container.addClass("container");
                container.attr("id", "weather-container");
                $("body").append(container);
                
                
                let weatherDisplay = $("<div>");
                weatherDisplay.addClass("col-12 row")                
                weatherDisplay.addClass("justify-content-center");
                weatherDisplay.addClass("align-items-center");
                weatherDisplay.addClass("align-content-center");
                weatherDisplay.addClass("align-self-center");
                weatherDisplay.addClass("text-center");
                weatherDisplay.attr("id", "weather-display");
                
                let weatherStats = $("<div>");
                weatherStats.addClass("row");
                weatherStats.addClass("weather-info");
                
         
                let blank = $("<div>");
                blank.addClass("col-2");
                blank.addClass("blank");
                weatherStats.append(blank);


                for (let i = 0; i < 5; i++) {
                    
                    if(j <= 32){
                        
                    
                    
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
                    weatherDisplay.append(weatherStats);
                    container.append(weatherDisplay);

                    console.log(forecast.fiveDay[i]);

                    j = j + 8;
                    console.log(j);
             


                    }
                }
                }







                // let day1 = $("<div>");
                // day1.addClass("col-2");
                // day1.addClass("day1");
                // day1.addClass("card");

                // let day2 = $("<div>");
                // day2.addClass("col-2");
                // day2.addClass("day2");
                // day2.addClass("card");

                // let day3 = $("<div>");
                // day3.addClass("col-2");
                // day3.addClass("day3");
                // day3.addClass("card");

                // let day4 = $("<div>");
                // day4.addClass("col-2");
                // day4.addClass("day4");
                // day4.addClass("card");

                // let day5 = $("<div>");
                // day5.addClass("col-2");
                // day5.addClass("day5");
                // day5.addClass("card");

                //append the divs to the body
                // weatherStats.append(blank);
                // weatherStats.append(day1);
                // weatherStats.append(day2);
                // weatherStats.append(day3);
                // weatherStats.append(day4);
                // weatherStats.append(day5);


                // weatherDisplay.append(weatherStats);
                // container.append(weatherDisplay);
                //append the divs to the body



                //append the weather info to the divs
                //day 1
                // let day1Date = $("<p>");
                // let day1DateValue  = weatherInfo.list[0].dt_txt;

                // day1DateValue = dayjs(day1DateValue).format('dddd DD MMMM YYYY HH:mm');
                // day1Date.text(day1DateValue);

                // day1.append(day1Date);
                
                // let day1Temp = $("<p>");
                // day1TempValue = Math.round(weatherInfo.list[0].main.temp);
                // day1Temp.text(day1TempValue + "°C");
                // day1.append(day1Temp);
                
                // let day1Icon = $("<img>");
                // day1Icon.css("width", "50%");
               
                // day1Icon.attr("src", "http://openweathermap.org/img/w/" + weatherInfo.list[0].weather[0].icon + ".png");
                // day1.append(day1Icon);

                // let day1Description = $("<p>");
                // day1Description.text(weatherInfo.list[0].weather[0].description);
                // day1.append(day1Description);

                // let day1Wind = $("<p>");
                // day1Wind.text("Wind Speed: " +weatherInfo.list[0].wind.speed + "m/s");
                // day1.append(day1Wind);

                // let day1Humidity = $("<p>");
                // day1Humidity.text("Humidity: " + weatherInfo.list[0].main.humidity + "%");
                // day1.append(day1Humidity);



                // //day 2
                // let day2Date = $("<p>");
                // let day2DateValue = weatherInfo.list[8].dt_txt;

                // day2DateValue = dayjs(day2DateValue).format('dddd DD MMMM YYYY HH:mm');
                // day2Date.text(day2DateValue);
                
                // day2.append(day2Date);

                // let day2Temp = $("<p>");
                // day2TempValue = Math.round(weatherInfo.list[8].main.temp);
                // day2Temp.text(day2TempValue + "°C");
                // day2.append(day2Temp);

                // let day2Icon = $("<img>");
                // day2Icon.attr("src", "http://openweathermap.org/img/w/" + weatherInfo.list[8].weather[0].icon + ".png");
                // day2.append(day2Icon);
                // day2Icon.css("width", "50%");

                // let day2Description = $("<p>");
                // day2Description.text(weatherInfo.list[8].weather[0].description);
                // day2.append(day2Description);

                // let day2Wind = $("<p>");
                // day2Wind.text("Wind Speed: " +weatherInfo.list[8].wind.speed + "m/s");
                // day2.append(day2Wind);

                // let day2Humidity = $("<p>");
                // day2Humidity.text("Humidity: " + weatherInfo.list[8].main.humidity + "%");
                // day2.append(day2Humidity);
                

                
                // //day 3
                // let day3Date = $("<p>");
                // let day3DateValue = weatherInfo.list[16].dt_txt;
                
                // day3DateValue = dayjs(day3DateValue).format('dddd DD MMMM YYYY HH:mm');
                // day3Date.text(day3DateValue);

                // day3.append(day3Date);
                
                // let day3Temp = $("<p>");
                // day3TempValue = Math.round(weatherInfo.list[16].main.temp);
                // day3Temp.text(day3TempValue + "°C");
                // day3.append(day3Temp);

                // let day3Icon = $("<img>");
                // day3Icon.attr("src", "http://openweathermap.org/img/w/" + weatherInfo.list[16].weather[0].icon + ".png");
                // day3Icon.css("width", "50%");
                // day3.append(day3Icon);
                

                // let day3Description = $("<p>");
                // day3Description.text(weatherInfo.list[16].weather[0].description);
                // day3.append(day3Description);

                // let day3Wind = $("<p>");
                // day3Wind.text("Wind Speed: " +weatherInfo.list[16].wind.speed + "m/s");
                // day3.append(day3Wind);

                // let day3Humidity = $("<p>");
                // day3Humidity.text("Humidity: " + weatherInfo.list[16].main.humidity + "%");
                // day3.append(day3Humidity);



                // //day 4
                // let day4Date = $("<p>");
                // let day4DateValue = weatherInfo.list[24].dt_txt;

                // day4DateValue = dayjs(day4DateValue).format('dddd DD MMMM YYYY HH:mm');
                // day4Date.text(day4DateValue);

                // console.log(day4DateValue);
                // day4.append(day4Date);

                // let day4Temp = $("<p>");
                // day4TempValue = Math.round(weatherInfo.list[24].main.temp);
                // day4Temp.text(day4TempValue + "°C");
                // day4.append(day4Temp);

                // let day4Icon = $("<img>");
                // day4Icon.css("width", "50%");
                // day4Icon.attr("src", "http://openweathermap.org/img/w/" + weatherInfo.list[24].weather[0].icon + ".png");
                // day4.append(day4Icon);

                // let day4Description = $("<p>");
                // day4Description.text(weatherInfo.list[24].weather[0].description);
                // day4.append(day4Description);

                // let day4Wind = $("<p>");
                // day4Wind.text("Wind Speed: " +weatherInfo.list[24].wind.speed + "m/s");
                // day4.append(day4Wind);

                // let day4Humidity = $("<p>");
                // day4Humidity.text("Humidity: " + weatherInfo.list[24].main.humidity + "%");
                // day4.append(day4Humidity);



                // //day 5
                // let day5Date = $("<p>");
                // let day5DateValue = weatherInfo.list[32].dt_txt;

                // day5DateValue = dayjs(day5DateValue).format('dddd DD MMMM YYYY HH:mm');
                // day5Date.text(day5DateValue);

                // day5.append(day5Date);

                // let day5Temp = $("<p>");
                
                // day5TempValue = Math.round(weatherInfo.list[32].main.temp);
                // day5Temp.text(day5TempValue + "°C");
                // day5.append(day5Temp);

                // let day5Icon = $("<img>");
                // day5Icon.css("width", "50%");
                // day5Icon.attr("src", "http://openweathermap.org/img/w/" + weatherInfo.list[32].weather[0].icon + ".png");
                // day5.append(day5Icon);

                // let day5Description = $("<p>");
                // day5Description.text(weatherInfo.list[32].weather[0].description);
                // day5.append(day5Description);

                // let day5Wind = $("<p>");
                // day5Wind.text("Wind Speed: " +weatherInfo.list[32].wind.speed + "m/s");
                // day5.append(day5Wind);

                // let day5Humidity = $("<p>");
                // day5Humidity.text("Humidity: " + weatherInfo.list[32].main.humidity + "%");
                // day5.append(day5Humidity);
                






                
   