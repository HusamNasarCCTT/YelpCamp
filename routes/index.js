var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");
var middleware = require("../middleware");

//ROOT ROUTE
router.get("/", function(req, res) {
    res.render("landing");
});

//Route to show user register form
router.get("/register", function(req, res) {
    res.render("users/register");
});

//Route to handle user registration logic
router.post("/register", function(req, res) {
    var newUser = new User({
        username: req.body.username
    });
    var password = req.body.password;
    User.register(newUser, password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("users/register");
        }
        var authenticate = passport.authenticate('local');
        authenticate(req, res, function() {
            req.flash("success", "User: \"" + req.body.username + "\" is logged in");
            res.redirect("/campgrounds");
        });
    });
});

//Route to show logout form
router.get("/login", function(req, res) {
    res.render("users/login");
});

//Route to handle logout logic
router.post("/login", passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
    req.flash("success", "User: \"" + req.body.username + "\" is logged in");
});

//Route to handle logout logic
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You have been logged out");
    res.redirect("/campgrounds");
});

module.exports = router;