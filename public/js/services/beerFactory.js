app.factory('beerService', function($http) {
  var beers = [];
  var ratings = [1, 2, 3, 4, 5];
  var isSortAscending = true;

  var beerObj = {beers: beers, ratings: ratings, sort: isSortAscending};

  beerObj.getBeers = function() {
    return $http.get('/beers')
      .then(function(response) {
        angular.copy(response.data, beerObj.beers); // copies the data that was received into our beers array
      }, function(err) {
        console.error(err)
      });
  };

  beerObj.addBeer = function(name, style, abv, image) {
    var newBeer = {name: name, ratings:[], style: style, abv: abv, image_url: image};
    //beerObj.beers.push(newBeer);
    $http.post('/beers', newBeer);
    beerObj.getBeers();
  };

  beerObj.removeBeer = function(id) {
    //beerObj.beers.splice($index, 1);
    $http.delete('/beers/' + id);
    beerObj.getBeers();
  };

  beerObj.addRating = function(beer_rating, $index, id) {
    // ## When pressing "select" on select rating: we DON'T WANT to update the database ## //
    if (typeof(beer_rating) != 'number') {
      return;
    }

    var total = 0;
    var prevAvgRating;
    var avgRating;
    var numOfRatings = beerObj.beers[$index].ratings.length;
    var ratings = beerObj.beers[$index].ratings;
    var newRatings = [];

    /* ###################### Making a NEW array which is BASED (NOT referencing to) on our array #################### */
    for (var i = 0; i < numOfRatings; i++) {
      total += ratings[i];
      newRatings.push(ratings[i]);
    }

    newRatings.push(beer_rating);

    prevAvgRating = total / numOfRatings;
    avgRating = (total + beer_rating) / (numOfRatings + 1);
    // ###################### WE DON'T WANT TO ALTER OUR DATA! this is the SERVER's job ####################### //
    //beerObj.beers[$index].ratings.push(beer_rating);
    //beerObj.beers[$index].avgRating = (total + beer_rating)/(numOfRatings + 1);
  /*  $http.put('/beers/' + id, beerObj.beers[$index]).then(function(response) {
      beerObj.getBeers();
      console.log(response);
    }) */
    $http.put('/beers/' + id, {ratings: newRatings, avgRating: avgRating}).then(function(response) {
      beerObj.getBeers();
      console.log(response);
    })
  };

  beerObj.updateBeers = function($index, id) {
    $http.put('/beers/' + id, beerObj.beers[$index]).then(function(response) {
      beerObj.getBeers();
      console.log(response);
    })
  };

  beerObj.sortAscending = function() {
    beerObj.beers.sort(function(a, b){return a.avgRating - b.avgRating});
    beerObj.isSortAscending = false;
  };

  beerObj.sortDescending = function() {
    beerObj.beers.sort(function(a, b){return b.avgRating - a.avgRating});
    beerObj.isSortAscending = true;
  };

  return {
    beerObj: beerObj
  };

});
