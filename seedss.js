var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

//Data to be seeded
var data = [{
        name: "Cloud's Rest",
        image: "https://source.unsplash.com/XvgtPNWCQcw",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos magnam molestiae rem. Dolore minima maiores vel, numquam quis modi reprehenderit adipisci neque pariatur non quos id! Et cumque quia accusantium?"
    },
    {
        name: "Desert Rose",
        image: "https://source.unsplash.com/aWZjpucxlgE",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos magnam molestiae rem. Dolore minima maiores vel, numquam quis modi reprehenderit adipisci neque pariatur non quos id! Et cumque quia accusantium?"
    },
    {
        name: "Camp Aurora",
        image: "https://source.unsplash.com/FQ96bh4O1tY",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos magnam molestiae rem. Dolore minima maiores vel, numquam quis modi reprehenderit adipisci neque pariatur non quos id! Et cumque quia accusantium?"
    }
];

function seedDB() {
    //Delete everything from Campgrounds
    deleteCampgrounds();

    //Add a few campgrounds...
    //addCampgrounds();
}

function deleteCampgrounds() {
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Campgrounds removed successfully");
        }
    });
}

function addCampgrounds() {
    data.forEach(function(seed) {
        Campground.create(seed, function(err, campground) {
            if (err) {
                console.log(err);
            } else {
                console.log("Added data");
                //Create a comment.
                Comment.create({
                    text: "This place is great, I wish it had Wi-fi",
                    author: "Homer"
                }, function(err, comment) {
                    if (err) {
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment");
                    }
                });
            }
        });
    });
}

module.exports = seedDB;