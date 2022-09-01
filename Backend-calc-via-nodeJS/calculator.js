const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    // res.send("<h1>Hello World</h1>");
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){   
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    var result = weight/height/height;
    res.send("<h1>The BMI is "+result+"</h1>");
});


app.listen(4000,function(){
    console.log("Server had been started up");
});

