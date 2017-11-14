const express               = require("express")
const mongoose              = require("mongoose")
const passport              = require("passport")
const bodyParser            = require("body-parser")
const LocalStrategy         = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose")
const User                  = require("./models/user")

mongoose.connect("mongodb://localhost/auth_demo")

const app = express()

app.set("view engine", "ejs")

app.get("/", function(req, res){
    res.render("home")
})

app.get("/secret", function(req, res){
    res.render("secret")
})

app.listen(3000, function(){
    console.log("auth app on 3000!")
})