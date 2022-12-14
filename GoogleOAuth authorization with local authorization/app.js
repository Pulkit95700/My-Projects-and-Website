require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const { appendFile } = require("fs");
// const md5 = require("md5");
// const bcrypt = require("bcrypt");
// const saltRound = 10;

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(session({
    secret: 'I am Pulkit',
    resave: false,
    saveUninitialized: false,
  }))

app.use(passport.initialize())
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser: true});
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// const secret = process.env.SECRET;
// userSchema.plugin(encrypt, {secret: secret}, {encryptedFields: ["password"]})
const user = mongoose.model("user", userSchema);    
passport.use(user.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });


//Google Strategy--------------------------------
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    user.findOrCreate({googleId: profile.id}, function (err, user) {
      return cb(err, user);
    });
  }
));
app.get("/", function(req, res){ 
    res.render("home");
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile"] })
); 

app.get("/auth/google/secrets", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });

app.route("/register")
    .get(function(req, res){
        res.render("register");
    })
    .post(function(req, res){
        user.register({username: req.body.username}, req.body.password, function(err,users){
            if(err){
                console.log(err);
                res.redirect("/register");
            }
            else{
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/secrets");
                });
            }
        })

        // const newUser = new user({
        //     email: req.body.username,
        //     password: req.body.password
        // })
        // newUser.save(function(err){
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         res.render("secrets")
        //     }
        // }) 
    });
app.route("/login")
    .get(function(req, res){
        res.render("login");
    })
    .post(function(req, res){
        const newUser = new user({
            username: req.body.username,
            password: req.body.password
        })
        req.login(newUser, function(err){
            if(err){
                console.log(err);
            }
            else{
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/secrets");
                })
            }
        })
        // user.findOne({email: req.body.username}, function(err, docs){
        //     if(err){
        //         res.send(err);
        //     }
        //     else{
        //         if(docs.password === md5(req.body.password)){
        //             res.render("secrets");
        //         }
        //         else{
        //             res.send("wrong password");
        //         }
        //     }
        // })
    })
app.route("/submit")
    .get(function(req, res){
        res.render("submit");
    })
    .post(function(req, res){
    })
app.route("/secrets")
    .get(function(req, res){
        if(req.isAuthenticated()){
            res.render("secrets");
        }
        else{
            res.redirect("/login");
        }
    })
app.get("/logout", function(req, res){
    req.logout(function(err){
        res.redirect("/");
    })
})
app.listen(3000, ()=>{
    console.log("Server is up and started..")
});
