
 


if (navigator.geolocation) {				
  navigator.geolocation.getCurrentPosition(showWeather);
 } else {
  alert('Geolocation is not supported in your browser');
 }



//weather api stuff
var weatherLat;
var weatherLong;
var weatherApiKey = "2c4c1b40150315a4932ce96218c53230";
// var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + weatherLat + "&lon=" + weatherLong+ "&units=imperial&appid=" + weatherApiKey;
var weatherURL = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${weatherLat},${weatherLong})")&format=json`;

function showWeather(area) {
weatherLat = area.coords.latitude;
weatherLong = area.coords.longitude;
// weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + weatherLat + "&lon=" + weatherLong+ "&units=imperial&appid=" + weatherApiKey;
weatherURL = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${weatherLat},${weatherLong})")&format=json`;

$.ajax({
    url: weatherURL,
    method: "GET"
  })

  .then(function(response) {
    console.log(response);
    var link = response.query.results.channel;
    var index = parseInt(link.item.condition.code);
    
    $(".icon").append(`<i class='wi wi-yahoo-${index}' style='font-size: 7em'></i>`)
    $(".weather").append(`<div>${link.location.city}, ${link.location.region}, ${link.location.country}</div>`);
    $(".weather").append(`<div>${link.item.condition.text}</div>`);
    $(".weather").append(`<div>${link.item.condition.temp} °F</div>`);
    });

  }
