/*=====================================================
                        Setup
=======================================================*/
var express = require('express'); // require something installed with "npm" (there's no "./")
var expressSession = require('express-session');
var request = require('request');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
//var Beer = require("./models/BeerModel"); // this require is now in userRoutes.js
var beerRoutes = require('./routes/beerRoutes');
var User = require("./models/UserModel"); //
var userRoutes = require('./routes/userRoutes'); // the "./" tells node that we are requiring a "local" module
mongoose.connect("mongodb://localhost/beers");

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(expressSession({
  secret: 'yourSecretHere',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy()); //Thanks to m-l-p there is no need to create a local strategy
passport.serializeUser(User.serializeUser()); //also it helps here
passport.deserializeUser(User.deserializeUser()); //and here

//This tells the server that when a request comes into '/beers'
//that it should use the routes in 'beerRoutes'
//and those are in our new beerRoutes.js file
app.use('/beers', beerRoutes);
app.use('/users', userRoutes);

/*=====================================================
                  Start the server
=======================================================*/
app.listen(8000, function() {
  console.log("Fullstack project. Listening on 8000.")

});
