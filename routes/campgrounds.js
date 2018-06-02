var express = require("express");
var router = express.Router();
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");
var middleware = require("../middleware");

//INDEX - Show all campgrounds
router.get("/", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err || !allCampgrounds) {
            console.log(err);
            req.flash("error", "Campgrounds not found, please contact Sys Admin");
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds
            });
            console.log(allCampgrounds);
        }
    });

});

//CREATE - Add new Campground
router.post("/", middleware.isLoggedIn, function(req, res) {
    //Get data from form and add to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var campground = {
        name: name,
        image: image,
        description: desc,
        price: price,
        author: author
    };
    Campground.create(campground, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            //Redirect Back to campgrounds
            res.redirect("/campgrounds");
        }
    });

});

//NEW - Show form to create new Campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW - Show Campground
router.get("/:id", function(req, res) {
    //Find the campground with provided id
    var campgroundId = req.params.id;
    Campground.findById(campgroundId).populate("comments").exec(function(err, foundCampground) {
        if (err || !foundCampground) {
            console.log(err);
            req.flash("error", "Campground does not exist");
            res.redirect("back");
        } else {
            console.log(foundCampground);
            //Render 'show' template with campground
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
});

//EDIT Campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {
            campground: foundCampground
        });
    });

});

//UPDATE Campground route
router.put("/:id/", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            console.log(err);
            redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY Campground Route
router.delete("/:id/", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect("/campgrounds");
    });
});

module.exports = router;