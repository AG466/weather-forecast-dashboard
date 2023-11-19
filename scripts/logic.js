
// // let queryURL ="api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0e03969665ea5e42726942638222f3c0";
// let geoURL = "api.openweathermap.org/data/2.5/forecast?q=London&appid=" + apiKey;
let apiKey = "0e03969665ea5e42726942638222f3c0"
// let geoUrl = "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=0e03969665ea5e42726942638222f3c0";

// prevent index.html from reloading when search button is clicked

$("#search-form").on("submit", function(event) {
    event.preventDefault();
    let city = $("#search-input").val();
    console.log(city);
   
    })





// fetch(queryURL)
//     .then(function(response) {
//     return response.json(); 
//     }).then(function (geographyData) {
    
//     console.log(geographyData);

//     // let lat = geographyData.city.coord.lat;
//     // console.log(lat);
//     // let lon = geographyData.city.coord.lon;
//     // console.log(lon);

//     let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=" + apiKey;

//     fetch(weatherUrl)
//     .then(function(response) {
//         return response.json(); 
//         }).then(function (weatherInfo) {
//             console.log(weatherInfo);
//         }
//     )
//     })
// })

// function getWeather() {

// fetch(queryURL)
// .then(function (response) {
// return response.json(); 
// }).then(function (data) {
    
//     console.log(data);

//     let lat = data[0].lat;
//     console.log(lat);

//     let weatherDisplay = $("<div></div>");
//     weatherDisplay.attr("id", "weather-container");
//     weatherDisplay.text("Latitude: " + lat);

//     $("#weather-container").append(lat);
    
//     $("body").append(weatherDisplay);

// });

// }

// getWeather()