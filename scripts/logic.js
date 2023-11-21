// api left intentionally in code for ease of use
let apiKey = "0e03969665ea5e42726942638222f3c0"
// declares latitude and longitude variables
let lat = "";  
let lon = "";

// declares variables for the search bar and the search button
let searchBar = $("#search-input");

// declares html elements for the current weather display
let weatherNowJumbo = $("<div>").addClass("jumbotron jumbotron-fluid");
let weatherNowContainer = $("<div>").addClass("container");
let weatherNowRow = $("<div>").addClass("row");
let weatherNowCol = $("<div>")

let weatherNowMapCol = $("<div>");

let weatherNowHeader = $("<h1>");
let weatherNowTime = $("<h3></h3>");
let weatherNowTempDiv = $("<div>").css("display", "flex");
let weatherNowTempEl = $("<h3>");

let weathernNowIcon = $("<img>");
let weatherNowDescription = $("<p>");

let weatherNowWindEl = $("<p>");
let weatherNowHumidityEl = $("<p>");

let thermometerIcon = $("<i>").addClass("bi bi-thermometer-half");
let windIcon = $("<i>").addClass("bi bi-wind");
let humidityIcon = $("<i>").addClass("bi bi-moisture");
let descriptionIcon = $("<i>").addClass("bi bi-cloud-sun");

// weather object returned by api has 40 data points for weather. This is an offset from 0 for future days
let j = 6;
// declares an object to store the current weather
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

// declares an array to store the 5 day weather forecast
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
        humidity: "",
    },
    {
        ref: "",
        date: "",
        temp: "",
        icon: "",
        description: "",
        wind: "",
        humidity: "",
    },
    {
        ref: "",
        date: "",
        temp: "",
        icon: "",
        description: "",
        wind: "",
        humidity: "",
    },
    {
        ref: "",
        date: "",
        temp: "",
        icon: "",
        description: "",
        wind: "",
        humidity: "",
    }
]
// declares a complex object to store the current and 5 day weather forecast
let forecast = {
    current : weatherNow,
    fiveDay : fiveDays
}

// declares an array to store the search history
let history = [];

// modifies the search bar
searchBar.css("width", "60%");
searchBar.css("line-height", "2rem");
// searchBar.css("margin", "auto");


// declares a function which will run when the search button is clicked
$("#search-form").on("submit", function(event) {
    //§1. Code in this block takes the value of the search bar and uses it to query the api for the latitude and longitude of the city
    event.preventDefault();
    let city = $("#search-input").val();
    $("#search-input").val("");
    console.log(city);
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=" + apiKey;
    


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
        //§2. Code in this block uses the latitude and longitude to query the api for the object which contains info for current and 5 day weather forecast

        
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
    

                // §3. getCurrentWeather. Takes the object returned from api call and renders a map and current weather info into html elements
                function getCurrentWeather(weatherObject){
                    $("#map-container").empty();
                    $("#weather-now").empty();
                    $("#five-day-view").empty();
                    weatherNowCol.empty();
                    weatherNowTempDiv.empty();
                    weatherNowDescription.empty();
                    j=6;

                    forecast.current.town = weatherObject.city.name;
                    forecast.current.country = weatherObject.city.country;
                    forecast.current.date = dayjs(weatherObject.list[0].dt_txt).format('dddd DD MMMM YYYY');
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


                    weatherNowHeader.text(forecast.current.town + ", " + forecast.current.country);
                        weatherNowTime.text(forecast.current.date);
                        weatherNowTempDiv.text(" "+forecast.current.temp + " °C");
                        weathernNowIcon.attr("src", forecast.current.icon);
                        weatherNowDescription.text(" "+forecast.current.description);
                        weatherNowWindEl.text(" Wind Speed: " + forecast.current.wind + " m/s");
                        weatherNowHumidityEl.text(" Humidity: " + forecast.current.humidity + " %");
                    
                    $("#weather-now").append(weatherNowCol);
                    $("#map-pane").append(weatherNowMapCol);
                   

                    weatherNowCol.append(weatherNowHeader);
                    weatherNowCol.append(weatherNowTime);
                    weatherNowTempDiv.prepend(thermometerIcon);
                    weatherNowCol.append(weatherNowTempDiv);  
                    weatherNowCol.append(weathernNowIcon);

                    weatherNowDescription.prepend(descriptionIcon);
                    weatherNowCol.append(weatherNowDescription);
                    
                    weatherNowWindEl.prepend(windIcon);
                    weatherNowCol.append(weatherNowWindEl);
                    weatherNowHumidityEl.prepend(humidityIcon);
                    weatherNowCol.append(weatherNowHumidityEl);
                    
                    weatherNowMapCol.append(mapContainer);
                    

                    }

                // §4. getFiveDayWeather. Takes the object returned from api call and renders a 5 day weather forecast into html elements
                function getFiveDayWeather(weatherObject) {
                let container = $("<div>");
                container.addClass("container");
                container.attr("id", "weather-container");
                $("body").append(container);
                
                
                
                let weatherStats = $("<div>");
                weatherStats.addClass("d-flex flex-wrap justify-content-between p-3 text-center");
                weatherStats.addClass("weather-info");

                // for loop to create 5 day forecast

                for (let i = 0; i < 5; i++) {
                    
                    if(j <= 40){

                    let fiveDayDivs = $("<div>");
                    
                    
                    
                    fiveDayDivs.addClass("col-2 align-items-center border rounded");
                    fiveDayDivs.addClass("day"+i);
                    fiveDayDivs.addClass("card");
                    // fiveDayDivs.attr("data-id", i);
                    
                    forecast.fiveDay[i].ref = "day" + i;
                    
                    
                    let date = $("<p>");
                    date.attr("data-dateid", i);
                    forecast.fiveDay[i].date = dayjs(weatherObject.list[j].dt_txt).format('dddd DD MMMM YYYY HH:mm');
                    date.text(forecast.fiveDay[i].date);
                    fiveDayDivs.append(date);
                
                    let temp = $("<p>");
                    temp.attr("data-tempid", i);
                    forecast.fiveDay[i].temp = Math.round(weatherObject.list[j].main.temp);
                    temp.text(forecast.fiveDay[i].temp + "°C");
                    fiveDayDivs.append(temp);
                
                    let icon = $("<img>");
                    icon.attr("data-imgid", i);
                    icon.css("width", "20%");
                    forecast.fiveDay[i].icon = weatherObject.list[j].weather[0].icon + ".png";
                    icon.attr("src", "http://openweathermap.org/img/w/" + forecast.fiveDay[i].icon);
                    fiveDayDivs.append(icon);

                    let description = $("<p>");
                    description.attr("data-descid", i)
                    forecast.fiveDay[i].description = weatherObject.list[j].weather[0].description;
                    description.text(forecast.fiveDay[i].description);
                    fiveDayDivs.append(description);

                    let wind = $("<p>");
                    wind.attr("data-windid", i)
                    forecast.fiveDay[i].wind ="Wind Speed: " +weatherObject.list[j].wind.speed + "m/s";
                    wind.text(forecast.fiveDay[i].wind);
                    fiveDayDivs.append(wind);
                    
                    let humidity = $("<p>");
                    humidity.attr("data-humid", i)
                    forecast.fiveDay[i].humidity = "Humidity: " + weatherObject.list[j].main.humidity + "%";
                    humidity.text(forecast.fiveDay[i].humidity);
                    fiveDayDivs.append(humidity);

                    weatherStats.append(fiveDayDivs);
                    $("#five-day-view").append(weatherStats);
                    
                    j = j + 7;
                    
                    }
                    
                }
                history.unshift(forecast.current.town);
                console.log(history);
                displayHistory();
                localStorage.setItem(forecast.current.town, JSON.stringify(forecast));


            }   
            
            // §5. displayHistory. Takes the search history array and renders it into html elements dependant on history item selected - limit of most recent 5.
            function displayHistory(){
                $("#search-history").empty();
                $("#search-history").append("<h3>Search History</h3>");
                for(let i = 0; (i <history.length && i<5); i++){
                if(history[i] != undefined && history[i] != null){
                    let historySubDiv = $("<div>");
                    let historyButton = $("<button>");
                    historyButton.addClass("btn btn-outline-secondary");
                    historyButton.attr("data-name", history[i]);
                    historyButton.text(history[i]);
                    historyButton.css("width", "100%");

                    historySubDiv.append(historyButton);
                    $("#search-history").append(historySubDiv);
                }
            }

        }

        // §6. Event listener for search history buttons. Takes the data-name attribute of the button clicked and uses it to retrieve the weather object from local storage and render it into html elements    

        $("#search-history").on("click", function(event){
            event.preventDefault();

            
            let city = event.target.getAttribute("data-name");
            let weatherHistory = JSON.parse(localStorage.getItem(city));
            console.log(weatherHistory);

            $("#map-container").empty();

            // var mapContainer = $("#map-container").css({width: '500px', height: '400px' });
            $("<div id='map' style='width: 100%; height: 100%;'></div>").appendTo("#map-container");
            
            var map = L.map('map').setView([weatherHistory.current.lat, weatherHistory.current.lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            }).addTo(map);

            $("#weather-now").append(weatherNowCol);
            $("#map-pane").append(weatherNowMapCol);
           

            

            

            weatherNowHeader.text(weatherHistory.current.town + ", " + weatherHistory.current.country);
                    weatherNowTempDiv.prepend(thermometerIcon);
                    weatherNowDescription.prepend(descriptionIcon);
                    weatherNowWindEl.prepend(windIcon);
                    weatherNowHumidityEl.prepend(humidityIcon);
                        weatherNowTime.text(weatherHistory.current.date);
                        weatherNowTempDiv.text(" "+weatherHistory.current.temp + " °C");
                        weathernNowIcon.attr("src", weatherHistory.current.icon);
                        weatherNowDescription.text(" "+weatherHistory.current.description);
                        weatherNowWindEl.text(" Wind Speed: " + weatherHistory.current.wind + " m/s");
                        weatherNowHumidityEl.text(" Humidity: " + weatherHistory.current.humidity + " %");

                        weatherNowCol.append(weatherNowHeader);
                        weatherNowCol.append(weatherNowTime);
                        weatherNowTempDiv.prepend(thermometerIcon);
                        weatherNowCol.append(weatherNowTempDiv);  
                        weatherNowCol.append(weathernNowIcon);

                        weatherNowDescription.prepend(descriptionIcon);
                        weatherNowCol.append(weatherNowDescription);
                    
                        weatherNowWindEl.prepend(windIcon);
                        weatherNowCol.append(weatherNowWindEl);
                        weatherNowHumidityEl.prepend(humidityIcon);
                        weatherNowCol.append(weatherNowHumidityEl);
                    
                        // weatherNowMapCol.append(mapContainer);





            for(let counter = 0; counter < 5; counter++){
                let date = $("p[data-dateid="+counter+"]");
                date.text(weatherHistory.fiveDay[counter].date);
                console.log(weatherHistory);
                let temp = $("p[data-tempid="+counter+"]");
                temp.text(weatherHistory.fiveDay[counter].temp + "°C");
                $("img[data-imgid="+counter+"]").attr("src", "");
                // console.log(weatherHistory.fiveDay[counter].icon);
                $("img[data-imgid="+counter+"]").attr("src", "http://openweathermap.org/img/w/" + weatherHistory.fiveDay[counter].icon);
                let description = $("p[data-descid="+counter+"]");
                description.text(weatherHistory.fiveDay[counter].description);
                let wind = $("p[data-windid="+counter+"]");
                wind.text(weatherHistory.fiveDay[counter].wind);
                let humidity = $("p[data-humid="+counter+"]");
                humidity.text(weatherHistory.fiveDay[counter].humidity);
            }
            

            
            
        
        })

    
