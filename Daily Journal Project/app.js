const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const homeStartingContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem eum eligendi quas doloremque nisi ea doloribus! Voluptatem veniam nobis quibusdam, itaque, tempora non recusandae explicabo alias quis ratione dolorem. Veniam.orem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem eum eligendi quas doloremque nisi ea doloribus! Voluptatem veniam nobis quibusdam, itaque, tempora non recusandae explicabo alias quis ratione dolorem. Veniam.orem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem eum eligendi quas doloremque nisi ea doloribus! Voluptatem veniam nobis quibusdam, itaque, tempora non recusandae explicabo alias quis ratione dolorem. Veniam.";
const aboutContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem eum eligendi quas doloremque nisi ea doloribus! Voluptatem veniam nobis quibusdam, itaque, tempora non recusandae explicabo alias quis ratione dolorem. Veniam.";
const contactContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem eum eligendi quas doloremque nisi ea doloribus! Voluptatem veniam nobis quibusdam, itaque, tempora non recusandae explicabo alias quis ratione dolorem. Veniam.";
var postArray = [];

app.get("/", function(req, res){
    res.render("home", {Content: homeStartingContent, posts: postArray});
});

app.get("/about", function(req, res){
    res.render("about", {Content: aboutContent});
});

app.get("/contact", function(req, res){
    res.render("contact", {Content: contactContent});
});

app.get("/compose", function(req, res){
    res.render("compose");
});

app.post("/compose", function(req, res){
    const post = {
        title: req.body.titleData,
        postData: req.body.postData
    }
    postArray.push(post);
    console.log(postArray);
    res.redirect("/");
});

app.get("/post/:postTitle", function(req, res){
    const postTitle = _.lowerCase(req.params.postTitle);
    let index = checkPost(postTitle, postArray);
    if(index === -1){
        res.send("<h2>No Post Found </h2>");
    }
    else{
        res.render("post", {postTitle: postArray[index].title, postContent: postArray[index].postData});
    }
});

app.listen(3000, function(){
    console.log("Server is up and listening")
});

function checkPost(postTitle, postArray){
    for(let i=0; i<postArray.length; i++){
        if(postTitle === _.lowerCase(postArray[i].title)){
            return i;
        }
    }
    return -1;
}