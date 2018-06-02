var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");
var middleware = require("../middleware");

//NEW [COMMENT] - Show form to create new comment on campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    });
});

//CREATE [COMMENT] - Create new comment for campground
router.post("/", middleware.isLoggedIn, function(req, res) {
    //Lookup Campground through ID
    campgroundId = req.params.id;
    Campground.findById(campgroundId, function(err, campground) {
        if (err) {
            req.flash("error", "Could not find Campground");
            res.redirect("/campgrounds");
        } else {
            //Create new Comment
            var comment = req.body.comment;
            Comment.create(comment, function(err, newComment) {
                if (err) {
                    req.flash("error", "Something went wrong, please check logs");
                    console.log(err);
                    res.redirect("back");
                } else {
                    //Add username and id
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    //Save Comment
                    newComment.save();
                    //Connect new comment to Campground
                    campground.comments.push(newComment);
                    campground.save();
                    req.flash("success", "Comment added successfully");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });

        }
    });

    //Redirect to Campground show page
});

//EDIT Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {
                campground_id: req.params.id,
                comment: foundComment
            });
        }
    });
});

//UPDATE Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    var commentId = req.params.comment_id;
    Comment.findByIdAndRemove(commentId, function(err) {
        if (err) {
            console.log(err);
        }
        req.flash("success", "Comment deleted");
        res.redirect("/campgrounds/" + req.params.id);
    });
});

module.exports = router;