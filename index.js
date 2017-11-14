const express               = require("express")
const mongoose              = require("mongoose")
const passport              = require("passport")
const bodyParser            = require("body-parser")
const LocalStrategy         = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose")
const User                  = require("./models/user")
///////////////////////////////////
mongoose.connect("mongodb://localhost/auth_demo")
const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
///////////////////////////////////
app.use(require("express-session")({
    secret: "Can you keep a secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
/////////////////////////////////////

// Routes ///////////////////////////
app.get("/register", function(req, res){
    res.render("register")
})

app.post("/register", function(req, res){
    const username = req.body.username
    const password = req.body.password
    User.register(new User({username: username}), password, function(err, user){
        if(err){
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret")
        })
    })
})

app.get("/", function(req, res){
    res.render("home")
})

app.get("/secret", function(req, res){
    res.render("secret")
})

app.listen(3000, function(){
    console.log("auth app on 3000!")
})