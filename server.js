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

// I - client, request beers from the server, it responds with JSON of 2 beers
/*app.get('/beers', function (req, res, next) {
  res.json({beers: [
    { name: '512 IPA', style: 'IPA', image_url: 'http://bit.ly/1XtmB4d', abv: 5 },
    { name: '512 Pecan Porter', style: 'Porter', image_url: 'http://bit.ly/1Vk5xj4', abv: 4 }
  ]});
}); */

/*=====================================================
                    POST Requests
=======================================================*/
app.post('/beers', function (req, res, next) {
  /* This is another way to POST, without the POSTMAN
  req.body.name = "512 Pecan Porter";
  req.body.style = "Porter";
  req.body.image_url = "http://bit.ly/1Vk5xj4";
  req.body.abv = 4;
  */

  /* This is a "lengthy" way (POSTMAN required) of posting a beer
  var beer = new Beer(req.body);

  beer.save(function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.json(beer);
    }
  }); */

  /* The short way to post in POSTMAN : saves us to do:
  1) var beer = new Beer
  2) beer.save ...
  with just Beer.create */
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
  Beer.findOneAndUpdate({ _id: req.params.id }, { $push: req.body}, {new: true}, function(err, beer) {
    if (err) {
      console.error(err);
      return next(err);
    } else {

      console.log(beer);
        res.send(beer);
    }
  });
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
