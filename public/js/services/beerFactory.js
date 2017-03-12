app.factory('beerService', function($http) {
  //var beers = [];

  var isSortAscending = true;

  //var beerService = {beers: beers, ratings: ratings, sort: isSortAscending};
  var beerService = {sort: isSortAscending};

  beerService.getBeers = function() {
    return $http.get('/beers')
      .then(function(response) {
        console.log("got");
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

  beerService.addBeer = function(name, style, abv, image) {
    var newBeer = {name: name, ratings:[], avg: 0, style: style, abv: abv, image_url: image};
  //  $http.post('/beers', newBeer);
  //  beerService.getBeers();
    return $http.post('/beers', newBeer).then(function(response) {
      return response.data;
    }, function(err) {
        console.error(err);
    });
  };

  beerService.removeBeer = function(id) {
    //$http.delete('/beers/' + id);
    //beerService.getBeers();
    return $http.delete('/beers/' + id).then(function(response) {
      return response.data;
    }, function(err) {
        console.error(err);
    });
  };

  beerService.addRating = function(beer_rating, id) {
    // ## When pressing "select" on select rating: we DON'T WANT to update the database ## //
    return $http.put('/beers/' + id, {ratings: beer_rating}).then(function(response) {
      return response.data;
    })
  /*  var total = 0;
    var prevAvgRating;
    var avgRating;
    var numOfRatings = beerService.beers[$index].ratings.length;
    var ratings = beerService.beers[$index].ratings;
    var newRatings = []; */

    /* ###################### Making a NEW array which is BASED (NOT referencing to) on our array #################### */
  /*  for (var i = 0; i < numOfRatings; i++) {
      total += ratings[i];
      newRatings.push(ratings[i]);
    }

    newRatings.push(beer_rating);

    prevAvgRating = total / numOfRatings;
    avgRating = (total + beer_rating) / (numOfRatings + 1); */
    // ###################### WE DON'T WANT TO ALTER OUR DATA! this is the SERVER's job ####################### //
    //beerService.beers[$index].ratings.push(beer_rating);
    //beerService.beers[$index].avgRating = (total + beer_rating)/(numOfRatings + 1);
  /*  $http.put('/beers/' + id, beerService.beers[$index]).then(function(response) {
      beerService.getBeers();
      console.log(response);
    }) */
    /*$http.put('/beers/' + id, {ratings: newRatings, avgRating: avgRating}).then(function(response) {
      beerService.getBeers();
      console.log(response);
    }) */
  };

  beerService.updateBeers = function($index, id) {
    console.log("hello");
  /*  $http.put('/beers/' + id, beerService.beers[$index]).then(function(response) {
      beerService.getBeers();
      console.log(response);
    })*/
  };

  beerService.sortAscending = function() {
    beerService.beers.sort(function(a, b){return a.avgRating - b.avgRating});
    beerService.isSortAscending = false;
  };

  beerService.sortDescending = function() {
    beerService.beers.sort(function(a, b){return b.avgRating - a.avgRating});
    beerService.isSortAscending = true;
  };

  return beerService;

});
