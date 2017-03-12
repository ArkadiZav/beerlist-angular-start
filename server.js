/*=====================================================
                        Setup
=======================================================*/
var express = require('express'); // require something installed with "npm" (there's no "./")
var app = express();
var request = require('request');

var mongoose = require('mongoose');

var Beer = require("./models/BeerModel"); // the "./" tells node that we are requiring a "local" module
mongoose.connect("mongodb://localhost/beers");

app.use(express.static('public'));
app.use(express.static('node_modules'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*=====================================================
                    GET Requests
=======================================================*/
app.get('/beers', function(req, res, next) {
  //res.send('Testing Server')
  Beer.find(function (error, beers) {
    if(error) { return console.error(error); }
    console.log("got beers");
    console.log(beers);
    res.send(beers);
  });
});

/*=====================================================
                    POST Requests
=======================================================*/
app.post('/beers', function (req, res, next) {
  Beer.create(req.body, function(err, beer) {
  if (err) {
    console.error(err)
    return next(err);
  } else {
    res.json(beer);
  }
});
});

/*=====================================================
                    DELETE Requests
=======================================================*/
app.delete('/beers/:id', function(req, res, next) {
  Beer.remove({ _id: req.params.id }, function(err) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send("Beer Deleted!");
    }
  });
});

/*=====================================================
                    PUT Requests
=======================================================*/
app.put('/beers/:id', function(req, res, next) {
  // ARE we updating the ratings? ...
  if (!("name" in req.body)) { // ONLY the ratings are a key here
    Beer.findOneAndUpdate({ _id: req.params.id }, {$push: req.body}, {new: true}, function(err, beer) {
      if (err) {
        console.error(err);
        return next(err);
      } else {
          res.send(beer); // sending UPDATED beer because of {new: true}
      }
    });
  }
  // OR ARE WE updating the text fields?
  else { // every key of BEER is in here, because the *beer object* was sent here
    Beer.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, beer) {
      if (err) {
        console.error(err);
        return next(err);
      } else {
          res.send(beer);
      }
    });
  }
});

/*=====================================================
                  ERROR handle
=======================================================*/
// catch 404 and forward to main error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

/*=====================================================
                  Start the server
=======================================================*/
app.listen(8000, function() {
  console.log("Fullstack project. Listening on 8000.")

});
