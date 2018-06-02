//Requiring models
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");

//All the middleware goes here
var middlewareObj = {
    isLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You must be logged in to do this");
        res.redirect("/login");
    },

    checkCampgroundOwnership: function(req, res, next) {
        if (req.isAuthenticated()) {
            //Does campground belong to user
            Campground.findById(req.params.id, function(err, foundCampground) {
                if (err || !foundCampground) {
                    req.flash("error", "Woops, could not find Campground :( ")
                    res.redirect("back");
                } else {

                    if (foundCampground.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "You do not have permission to perform this action");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You must be logged in to do this");
            res.redirect("back");
        }
    },

    checkCommentOwnership: function(req, res, next) {
        if (req.isAuthenticated()) {
            //Does campground belong to user
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if (err || !foundComment) {
                    req.flash("error", "Oops, Could not find comment :( ");
                    res.redirect("back");
                } else {
                    if (foundComment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "You do not have permission to perform this action");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You must be logged in to do this");
            res.redirect("back");
        }
    }
}

module.exports = middlewareObj;