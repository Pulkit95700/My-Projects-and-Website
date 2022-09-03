const express = require("express");
const ejs = require("ejs");     
const app = express();

const date = require(__dirname + "/date.js")

var toDoList = ["Wake Up", "Run", "College", "Come Home"];
var workList = [];

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){

    let currentDay = date.getDay();

    res.render("list", {listTitle: currentDay, items: toDoList});

});

app.post("/", function(req, res){
    let item = req.body.item;
    if(req.body.button === "Work"){
        workList.push(item);
        res.redirect("/work");
    }
    else{
        toDoList.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", items: workList});
});

app.get("/about", function(req, res){
    res.render("about");
});
app.listen(3000, function(){
    console.log("Server is started and running up..");
})