app.factory('beerService', function($http) {
  var isSortAscending = false;
  //var beerService = {beers: beers, ratings: ratings, sort: isSortAscending};
  var beerService = {};

  beerService.getBeers = function() {
    return $http.get('/beers')
      .then(function(response) {
        console.log(response.data);
        //angular.copy(response.data, beerService.beers); // copies the data that was received into our beers array

        //if wanted/needed you can do data manipulation and parsing here
        //our returned data is wrapped in a pre-resolved promise
        //we can access that data in our controller using '.then'
        return response.data; // We no longer COPY the data, since we don't want to have data at all in our client
      }, function(err) {
          console.error(err);
      });
  };

//new server route for getting one specific beer
  beerService.getBeer = function(id) {
    return $http.get('/beers/' + id)
      .then(function(response) {
        return response.data;
      }, function(err) {
          console.error(err);
      });
  };

  beerService.addReview = function(name, comment, beer) {
    var newReview = {name: name, text: comment};
    return $http.post('/beers/' + beer._id + '/reviews', newReview).then(function(updatedBeer) {
      //console.log("reviews are here:");
      //console.log(updatedBeer.data.reviews[newBeer.data.reviews.length - 1]);
      return updatedBeer.data.reviews[updatedBeer.data.reviews.length - 1];
    }, function(err) {
        console.error(err);
    });
  };

  beerService.removeReview = function(reviewid, beerid) {
    return $http.delete('/beers/' + beerid + '/reviews/' + reviewid).then(function(response) {
      return response.data;
    }, function(err) {
        console.error(err);
    });
  };

  beerService.addBeer = function(name, style, abv, image) {
    var newBeer = {name: name, ratings:[], avg: 0, style: style, abv: abv, image_url: image};
    return $http.post('/beers', newBeer).then(function(response) {
      return response.data;
    }, function(err) {
        console.error(err);
    });
  };

  beerService.removeBeer = function(id) {
    return $http.delete('/beers/' + id).then(function(response) {
      return response.data;
    }, function(err) {
        console.error(err);
    });
  };

  beerService.addRating = function($index, beer_rating, id) { // Here the beer IS NOT updated in the view, so we can't just send the beer itself as a PUT parameter
    return $http.put('/beers/' + id, {ratings: beer_rating}).then(function(response) {
      return response.data;
    }, function(err) {
        console.error(err);
    });
  };

  beerService.editBeerInfo = function(beer) { // Here beer is already updated in the view, so we just need to apply it also to the server
    return $http.put('/beers/' + beer._id, beer).then(function(response) {
      return response.data;
    });
  };

  return beerService;
});
