var express = require('express');
var router = express.Router();
var Beer = require("../models/BeerModel");

//the beer routes go here
/*=====================================================
                    GET Requests
=======================================================*/
router.get('/', function(req, res, next) {
  //res.send('Testing Server')
  Beer.find(function(error, beers) {
    if (error) {
      return console.error(error);
    }
    console.log("got beers");
    console.log(beers);
    res.send(beers);
  });
});

// we need this route for the reviews : we are getting one specific beer by ID
router.get('/:id', function(req, res, next) {
  console.log("server get single beer");
  Beer.findById(req.params.id, function(error, beer) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(beer);
    }
  });
});

/*=====================================================
                    POST Requests
=======================================================*/
router.post('/', function(req, res, next) {
  Beer.create(req.body, function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.json(beer);
    }
  });
});

router.post('/:id/reviews', function(req, res, next) { // reviews for a SPECIFIC beer (with an ID)
  Beer.findById(req.params.id, function(error, foundBeer) {
    if (error) {
      console.error(err);
      return next(err);
    } else if (!foundBeer) { // the given id doesn't match any beer id
      res.send("Error! No beer found with that ID");
    } else {
      foundBeer.reviews.push(req.body); // req.body is the new review
      foundBeer.save(function(err, updatedBeer) {
        if (err) {
          return next(err);
        } else {
          res.send(updatedBeer);
        }
      });
    }
  });
});
/*=====================================================
                    DELETE Requests
=======================================================*/
router.delete('/:id', function(req, res, next) {
  Beer.remove({
    _id: req.params.id
  }, function(err) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send("Beer Deleted!");
    }
  });
});

router.delete('/:beerid/reviews/:reviewid', function(req, res, next) {
  Beer.findById(req.params.beerid, function(err, foundBeer) {
    if (err) {
      console.error(err)
      return next(err);
    } else if (!foundBeer) {
      res.send("Error! No beer found with that ID");
    } else { // I found the required beer - now let's find the specific review for that beer
      var reviewToDelete = foundBeer.reviews.id(req.params.reviewid); // (which id to remove? the one that we got as a beer review parameter, and from who? the found beer)
      // now we must check if the reviewid given is valid: i.e, we have a review for our beer with the given review id
      if (!reviewToDelete) {
        res.send("Error! No review found with that ID");
      } else {
        // remove and save
        reviewToDelete.remove();
        foundBeer.save(function(err, updatedBeer) {
          if (err) {
            return next(err);
          } else {
            res.send(updatedBeer);
          }
        });
      }
    }
  });
});

/*=====================================================
                    PUT Requests
=======================================================*/
router.put('/:id', function(req, res, next) {
  // ARE we updating the ratings? ...
  if (!("name" in req.body)) { // ONLY the ratings are a key here
    Beer.findOneAndUpdate({
      _id: req.params.id
    }, {
      $push: req.body
    }, {
      new: true
    }, function(err, beer) {
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
    Beer.findOneAndUpdate({
      _id: req.params.id
    }, req.body, {
      new: true
    }, function(err, beer) {
      if (err) {
        // If we, for instance, put a string: "al3.4" to abv field, it wil log that the cast to number failed, so it was unable to "PUT"
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
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// warning - not for use in production code!
router.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

module.exports = router;
