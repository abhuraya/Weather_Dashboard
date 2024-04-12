var listResult = $('#results');
var textInput = $('#location-input');
var btn = $('#enter-btn');
var sideBar = $('#side-bar');
var main = $('#content');



function getApi(lat, lon){
    
    var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&appid=9dec3bfde1150c1cb8327213d953611b';

    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);

        var zip = JSON.parse(localStorage.getItem('zip'));
        var cityName = $('<h1>');
        var weatherIcon = $('h2');
        var displayWeather = $('#current-weather');
        displayWeather.append(cityName);
        displayWeather.append(weatherIcon);
        cityName.text(zip);

        var weatherIconDisplay = function(iconPic){
            weatherIcon.text(iconPic);
        }

        var icon = function(pic){
    
            var iconPic = pic.id;
            weatherIconDisplay(iconPic);
            console.log(pic);
        }
        
        var icons = data.current.weather;
        for (var i = 0; i < icons.length; i++){
            var pic = icons[i];
            icon(pic);
        }

        var date = $('<p>');
        displayWeather.append(date);
        date.text('Current Date and Time in Unix' + ' ' + data.current.dt);

        var  currentHumidity= $('<p>');
        displayWeather.append(currentHumidity);
        currentHumidity.text('Current Humidity' + " " + data.current.humidity);

        var currentTemp = $('<p>');
        displayWeather.append(currentTemp);
        var farh = 1.8 * (data.current.temp -273) + 32;
        currentTemp.text('Temperature in F' + " " + farh);

        var windSpeed = $('<p>');
        displayWeather.append(windSpeed);
        windSpeed.text('Wind Speed' + ' ' + data.current.wind_speed);
     });
}



var searchApi = function(){
    var zip = JSON.parse(localStorage.getItem('zip'));
    var requestGeocoding = 'http://api.openweathermap.org/geo/1.0/direct?q='+ zip + '&limit=5&appid=9dec3bfde1150c1cb8327213d953611b';

    fetch(requestGeocoding)
    .then(function(response){
        return response.json();        
    })
    .then(function(latLon){

        for (var i = 0; i < latLon.length; i++){
            console.log(latLon[i]);
            resultObj(latLon[i]);
        }
    });

    var resultObj = function (locRes){

        var createBtn = $('<button>');
        createBtn.text(locRes.name + ", " + locRes.state);
        main.append(createBtn);

        createBtn.on('click', function(){
            var lat = locRes.lat;
            var lon = locRes.lon;
            getApi(lat, lon);
            location.reload;
        })
    }

    console.log(zip);
}

searchApi();



btn.on('click', function(event){
    event.preventDefault();
    var searchLoc = textInput.val();
    localStorage.setItem('zip', JSON.stringify(searchLoc));
    searchApi();
    getApi();
})


