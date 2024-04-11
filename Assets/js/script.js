var listResult = $('#results');
var textInput = $('#location-input');
var btn = $('#enter-btn');



function getApi(){
    
    var lat = 41.66;
    var lon = -70.123;
    
    var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&appid=9dec3bfde1150c1cb8327213d953611b';

    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });
}

getApi();

var searchApi = function(){
    var zip = JSON.parse(localStorage.getItem('zip'));
    var requestGeocoding = 'http://api.openweathermap.org/geo/1.0/direct?q='+ zip + '&limit=5&appid=9dec3bfde1150c1cb8327213d953611b';
    var resultArray = [];

    fetch(requestGeocoding)
    .then(function(response){
        return response.json();        
    })
    .then(function(state){
        for (var i = 0; i < state.length; i++){
            console.log(state[i]);
            //resultArray.push(i);
            /*var createP = $('<p>');
            createP.text(x.result[i]);
            listResult.append(createP);*/
        }
    });

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


