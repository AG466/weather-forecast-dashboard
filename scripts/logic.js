
// // let queryURL ="api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0e03969665ea5e42726942638222f3c0";
// let geoURL = "api.openweathermap.org/data/2.5/forecast?q=London&appid=" + apiKey;
let apiKey = "0e03969665ea5e42726942638222f3c0"
// let geoUrl = "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=0e03969665ea5e42726942638222f3c0";

// prevent index.html from reloading when search button is clicked

/*
1. On click retrive the value of the input field
2. API request for the coordinates of the city
3. API request for the weather of the city
4. Display the weather info on the page

*/

let searchBar = $("#search-input");
searchBar.css("width", "60%");




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
        let lat = geographyData.city.coord.lat;
        console.log(lat);
        let lon = geographyData.city.coord.lon;
        console.log(lon);


        //3
        let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=" + apiKey + "&units=metric";
        fetch(weatherUrl)
        .then(function(response) {
            return response.json(); 
            }).then(function (weatherInfo) {
                console.log(weatherInfo);


{/* <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Fluid jumbotron</h1>
    <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
  </div>
</div> */}


                let currentContainerJumbo = $("<div>");
                currentContainerJumbo.addClass("jumbotron");
                currentContainerJumbo.addClass("jumbotron-fluid");
                
                let currentContainer = $("<div>");
                currentContainer.addClass("container");


                let currentContainerRow = $("<div>");
                currentContainerRow.addClass("row");

                let currentContainerSpace = $("<div>");
                currentContainerSpace.addClass("col-2");

                let currentContainerCol = $("<div>");
                currentContainerCol.addClass("col-5");
                currentContainerCol.css("background-color", "pink");

                let currentMapContainer = $("<div>");
                currentMapContainer.addClass("col-5");
                currentMapContainer.attr("id", "map-grid-container");

                let currentWeatherHeader = $("<h1>");
                
                
                let currentWeatherTempDiv = $("<div>");
                let currentWeatherTemp = $("<p>");
                let currentTempIcon = $("<i>");
                currentTempIcon.addClass("bi bi-thermometer-half");
                currentWeatherTempDiv.append(currentTempIcon," ", currentWeatherTemp);
                currentWeatherTempDiv.css("display", "flex");
                
                let currentWeatherIcon = $("<img>");
                
                let currentWeatherDescription = $("<p>");
                
                
                let currentWeatherWindDiv = $("<div>");
                let currentWeatherWind = $("<p>");
                let currentWindIcon = $("<i>");
                currentWindIcon.addClass("bi bi-wind");
                currentWeatherWindDiv.append(currentWindIcon," ", currentWeatherWind);
                currentWeatherWindDiv.css("display", "flex");


                let currentWeatherHumidityDiv = $("<div>");
                let currentWeatherHumidity = $("<p>");
                let currentHumidityIcon = $("<i>");
                currentHumidityIcon.addClass("bi bi-droplet");
                currentWeatherHumidityDiv.append(currentHumidityIcon," ", currentWeatherHumidity);
                currentWeatherHumidityDiv.css("display", "flex");
                

                let weatherNow = weatherInfo.list[0].dt_txt;
                currentWeatherHeader.text(weatherInfo.city.name + ", (" + weatherInfo.city.country + ") " + dayjs(weatherNow).format('dddd DD MMMM YYYY HH:mm'));
                currentWeatherTemp.text(weatherInfo.list[0].main.temp);
                currentWeatherIcon.attr("src", "http://openweathermap.org/img/w/" + weatherInfo.list[0].weather[0].icon + ".png");
                currentWeatherDescription.text(weatherInfo.list[0].weather[0].description);
                currentWeatherWind.text(weatherInfo.list[0].wind.speed);
                currentWeatherHumidity.text(weatherInfo.list[0].main.humidity);

                    var mapContainer = $("#map-container").css({width: '500px', height: '400px' });
                    $("<div id='map' style='width: 100%; height: 100%;'></div>").appendTo("#map-container");
                    
                    var map = L.map('map').setView([lat, lon], 13);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    }).addTo(map);
                
                  
            
                

                // mapContainer.append(mapDiv);

               
                



                currentContainerCol.append(currentWeatherHeader);
                currentContainerCol.append(currentWeatherTempDiv);
                currentContainerCol.append(currentWeatherIcon);
                currentContainerCol.append(currentWeatherDescription);
                currentContainerCol.append(currentWeatherWindDiv);
                currentContainerCol.append(currentWeatherHumidityDiv);
                currentMapContainer.append(mapContainer);
                
                currentContainerRow.append(currentContainerSpace);
                currentContainerRow.append(currentContainerCol);
                currentContainerRow.append(currentMapContainer);

                currentContainer.append(currentContainerRow);

                currentContainerJumbo.append(currentContainer);

                $("body").append(currentContainerJumbo);






                //create divs for the 5 day forecast
                let container = $("<div>");
                container.addClass("container");
                container.attr("id", "weather-container");
                $("body").append(container);


                // let localeDisplay = $("<div>");

                // let locale = $("<div>");
                // locale.addClass("col-12");
                // locale.addClass("locale");
                // locale.addClass("row");

                // let localeName = $("<h1>");
                // let localCountry = $("<h2>");


                // localeName.text(weatherInfo.city.name);
                // localCountry.text(weatherInfo.city.country);
                
                // locale.append(localeName);
                // locale.append(localCountry);

                // localeDisplay.append(locale);


                
                let weatherDisplay = $("<div>");
                weatherDisplay.addClass("col-12 row")                
                weatherDisplay.addClass("row");
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


                let day1 = $("<div>");
                day1.addClass("col-2");
                day1.addClass("day1");
                day1.addClass("card");

                let day2 = $("<div>");
                day2.addClass("col-2");
                day2.addClass("day2");
                day2.addClass("card");

                let day3 = $("<div>");
                day3.addClass("col-2");
                day3.addClass("day3");
                day3.addClass("card");

                let day4 = $("<div>");
                day4.addClass("col-2");
                day4.addClass("day4");
                day4.addClass("card");

                let day5 = $("<div>");
                day5.addClass("col-2");
                day5.addClass("day5");
                day5.addClass("card");

                //append the divs to the body
                weatherStats.append(blank);
                weatherStats.append(day1);
                weatherStats.append(day2);
                weatherStats.append(day3);
                weatherStats.append(day4);
                weatherStats.append(day5);


                weatherDisplay.append(weatherStats);
                // container.append(localeDisplay);
                container.append(weatherDisplay);
                //append the divs to the body



                //append the weather info to the divs
                //day 1
                let day1Date = $("<p>");
                let day1DateValue  = weatherInfo.list[0].dt_txt;

                day1DateValue = dayjs(day1DateValue).format('dddd DD MMMM YYYY HH:mm');
                day1Date.text(day1DateValue);

                day1.append(day1Date);
                
                let day1Temp = $("<p>");
                day1TempValue = Math.round(weatherInfo.list[0].main.temp);
                day1Temp.text(day1TempValue + "°C");
                day1.append(day1Temp);
                
                let day1Icon = $("<img>");
                day1Icon.css("width", "50%");
               
                day1Icon.attr("src", "http://openweathermap.org/img/w/" + weatherInfo.list[0].weather[0].icon + ".png");
                day1.append(day1Icon);

                let day1Description = $("<p>");
                day1Description.text(weatherInfo.list[0].weather[0].description);
                day1.append(day1Description);

                let day1Wind = $("<p>");
                day1Wind.text("Wind Speed: " +weatherInfo.list[0].wind.speed + "m/s");
                day1.append(day1Wind);

                let day1Humidity = $("<p>");
                day1Humidity.text("Humidity: " + weatherInfo.list[0].main.humidity + "%");
                day1.append(day1Humidity);



                //day 2
                let day2Date = $("<p>");
                let day2DateValue = weatherInfo.list[8].dt_txt;

                day2DateValue = dayjs(day2DateValue).format('dddd DD MMMM YYYY HH:mm');
                day2Date.text(day2DateValue);
                
                day2.append(day2Date);

                let day2Temp = $("<p>");
                day2TempValue = Math.round(weatherInfo.list[8].main.temp);
                day2Temp.text(day2TempValue + "°C");
                day2.append(day2Temp);

                let day2Icon = $("<img>");
                day2Icon.attr("src", "http://openweathermap.org/img/w/" + weatherInfo.list[8].weather[0].icon + ".png");
                day2.append(day2Icon);
                day2Icon.css("width", "50%");

                let day2Description = $("<p>");
                day2Description.text(weatherInfo.list[8].weather[0].description);
                day2.append(day2Description);

                let day2Wind = $("<p>");
                day2Wind.text("Wind Speed: " +weatherInfo.list[8].wind.speed + "m/s");
                day2.append(day2Wind);

                let day2Humidity = $("<p>");
                day2Humidity.text("Humidity: " + weatherInfo.list[8].main.humidity + "%");
                day2.append(day2Humidity);
                

                
                //day 3
                let day3Date = $("<p>");
                let day3DateValue = weatherInfo.list[16].dt_txt;
                
                day3DateValue = dayjs(day3DateValue).format('dddd DD MMMM YYYY HH:mm');
                day3Date.text(day3DateValue);

                day3.append(day3Date);
                
                let day3Temp = $("<p>");
                day3TempValue = Math.round(weatherInfo.list[16].main.temp);
                day3Temp.text(day3TempValue + "°C");
                day3.append(day3Temp);

                let day3Icon = $("<img>");
                day3Icon.attr("src", "http://openweathermap.org/img/w/" + weatherInfo.list[16].weather[0].icon + ".png");
                day3Icon.css("width", "50%");
                day3.append(day3Icon);
                

                let day3Description = $("<p>");
                day3Description.text(weatherInfo.list[16].weather[0].description);
                day3.append(day3Description);

                let day3Wind = $("<p>");
                day3Wind.text("Wind Speed: " +weatherInfo.list[16].wind.speed + "m/s");
                day3.append(day3Wind);

                let day3Humidity = $("<p>");
                day3Humidity.text("Humidity: " + weatherInfo.list[16].main.humidity + "%");
                day3.append(day3Humidity);



                //day 4
                let day4Date = $("<p>");
                let day4DateValue = weatherInfo.list[24].dt_txt;

                day4DateValue = dayjs(day4DateValue).format('dddd DD MMMM YYYY HH:mm');
                day4Date.text(day4DateValue);

                console.log(day4DateValue);
                day4.append(day4Date);

                let day4Temp = $("<p>");
                day4TempValue = Math.round(weatherInfo.list[24].main.temp);
                day4Temp.text(day4TempValue + "°C");
                day4.append(day4Temp);

                let day4Icon = $("<img>");
                day4Icon.css("width", "50%");
                day4Icon.attr("src", "http://openweathermap.org/img/w/" + weatherInfo.list[24].weather[0].icon + ".png");
                day4.append(day4Icon);

                let day4Description = $("<p>");
                day4Description.text(weatherInfo.list[24].weather[0].description);
                day4.append(day4Description);

                let day4Wind = $("<p>");
                day4Wind.text("Wind Speed: " +weatherInfo.list[24].wind.speed + "m/s");
                day4.append(day4Wind);

                let day4Humidity = $("<p>");
                day4Humidity.text("Humidity: " + weatherInfo.list[24].main.humidity + "%");
                day4.append(day4Humidity);



                //day 5
                let day5Date = $("<p>");
                let day5DateValue = weatherInfo.list[32].dt_txt;

                day5DateValue = dayjs(day5DateValue).format('dddd DD MMMM YYYY HH:mm');
                day5Date.text(day5DateValue);

                day5.append(day5Date);

                let day5Temp = $("<p>");
                
                day5TempValue = Math.round(weatherInfo.list[32].main.temp);
                day5Temp.text(day5TempValue + "°C");
                day5.append(day5Temp);

                let day5Icon = $("<img>");
                day5Icon.css("width", "50%");
                day5Icon.attr("src", "http://openweathermap.org/img/w/" + weatherInfo.list[32].weather[0].icon + ".png");
                day5.append(day5Icon);

                let day5Description = $("<p>");
                day5Description.text(weatherInfo.list[32].weather[0].description);
                day5.append(day5Description);

                let day5Wind = $("<p>");
                day5Wind.text("Wind Speed: " +weatherInfo.list[32].wind.speed + "m/s");
                day5.append(day5Wind);

                let day5Humidity = $("<p>");
                day5Humidity.text("Humidity: " + weatherInfo.list[32].main.humidity + "%");
                day5.append(day5Humidity);




                // //append the weather info to the divs



                





                // $("#city-name").text(weatherInfo.city.name);
                // $("#temperature").text(weatherInfo.list[0].main.temp);

                // $("#weather-icon").attr("src", "http://openweathermap.org/img/w/" + weatherInfo.list[0].weather[0].icon + ".png");
                // $("#weather-description").text(weatherInfo.list[0].weather[0].description);



                
            }
        )
    })
})


