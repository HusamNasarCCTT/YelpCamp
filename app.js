var express = require("express"),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    expressSession = require("express-session"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    app = express(),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    seedDB = require("./seedss");

//Requiring routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");

//Connect to Database
mongoose.connect('mongodb://localhost/yelp_camp');

//Seeding DB with dummy data
// seedDB();

//Requiring models
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));

//Configuring Method Override for PUT/DELETE Requests
app.use(methodOverride("_method"));

/**
 * PASSPORT CONFIGURATION
 */
app.use(expressSession({
    secret: "YelpCamp",
    resave: false,
    saveUninitialized: false
}))

// Use flash
app.use(flash());

/**
 * Configuring PASSPORT
 */
app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/**
 * GLOBAL VALUES
 */
// User data
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Use routes
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments/", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

//Setting up server to listen
var port = process.env.PORT || 3000;
var ip = process.env.IP;
app.listen(port, ip, function() {
    console.log("App: YelpCamp");
    console.log("Version: 1");
    console.log("Port: " + port);
    console.log("Listening...");
});