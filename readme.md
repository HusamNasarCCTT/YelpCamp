#YelpCamp

* Add Landing Page
* Add Caompgrounds Page that lists all campgrounds.

Each Campground has:
* Name
* Image

#Layout and Basic Styling:
* Create Header and Footer partials.
* Add in Bootstrap

#Creating new campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

#Style the campgrounds page
* Add a better header/title
* Make Campgrounds display in a grid.

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

##v2 features:
# Add Mongoose
* Install and configure Mongoose
* Setup Campground model
* Use campground model inside of routes.

#Show Page
* Review the RESTful routes
* Add decription to campground model
* Show db.collection.drop()
* Add a show route/template

#Refactor Mongoose Code
* Create models directory
* Use module.exports
* 'require' everything correctly

#Add Seeds File
* Add a seeds.js file
* Run the seeds file every time

#Add the Comment Model
* Debug errors.
* Display Comments on campgrounds show page

#Comment New/Create
* Nested Routes
* Add the 'comment' new and create routes
* Add the new comment form

#Style Show Page
* Add sidebar to show page
* Display comments nicely

#Auth - User Model:
* Install packages needed for auth
* Define user model

#Auth - Register
* Configure Passport
* Add Register routes
* Add Register template

#Auth - Login
* Add login routes
* Add login template

#Auth - Logout/Navbar
* Add logout route
* Prevent user from adding comment if not logged in
* Add links to navbar
* Show/hide auth links correctly

#Refactor Routes
* Use Express Router to reorganize and serve routes.

#Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

#Users + campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route

#Deleting Campgrounds
* Add Destroy Route
* Add Delete button

#Authorization Part 1: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

#Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

<!-- Campground Edit Route: /campgrounds/:id/edit -->
<!-- Comment Edit Route:   /campgrounds/:id/comments/:comment_id/edit -->

#Deleting Comments
* Add Destroy route
* Add Delete button

Campground Destroy Route: /campgrounds/:id
Comment Destroy Route:    /campgrounds/:id/comments/:comment_id

#Authorization [Comments]
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/show edit and delete buttons
* Refactor Middleware

#Adding in flash
* Install and configure connect-flash
* Add Bootstrap alerts to header

#Style Landing page