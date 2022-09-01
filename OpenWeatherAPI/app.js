const https = require('node:https');
const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));

// for geoCoding API 
var lat = 0;
var lon = 0;

app.get("/", function(request, response){

    // for geocoding API 
    response.sendFile(__dirname + "/index.html");
});

app.post("/", function(request, response){
    const query = request.body.cityName;

    const urlGeocodingApi = "https://api.openweathermap.org/geo/1.0/direct?q="+query+"&appid=93850d750ff715016139f02eebed56e2"; 
    https.get(urlGeocodingApi, function(res){
        res.on("data", function(data){
            const geocodingData = JSON.parse(data);
            lat = geocodingData[0].lat;
            lon = geocodingData[0].lon;
            response.send("<h1>The latitude and longitudes are "+lat+" and"+lon+" respectively</h1>");
        });
    });
});


app.listen(3000, function(){
    console.log("Server has started up and running....");
})