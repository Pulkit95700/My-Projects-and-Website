const express = require("express");
const app = express();

const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/SignUP.html");
});

app.post("/", function(req,res){
    const Name = req.body.personName;
    const Email = req.body.personMail;
    const Pass = req.body.personPass;

    const apiKey = "78d4e740ae1569c290f740921c3c374d-us13";
    const dc = "us13";
    const list_id = "ab8d5d8c1d";
    const url = "https://"+dc+".api.mailchimp.com/3.0/lists/"+list_id;
    var data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: Name,
                    
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const options = {
        method: "POST",
        auth: "pulkitji:"+apiKey
    }

    const request = https.request(url, options, function(response){
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
        const statusCode = response.statusCode;

        if(statusCode === 200){
            res.sendFile(__dirname + "/Success.html");
        }
        else{
            res.sendFile(__dirname+"/Failure.html");
        }
    });
    console.log(request);
    request.write(jsonData);
    request.end();

});

app.post("/Failure.html", function(req, res){
    res.redirect("/");
})
app.listen(3000, function(){
    console.log("server has started up and running.. ");
});

