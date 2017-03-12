app.controller('beerCtrl', ['$scope','beerService', function($scope, beerService) {
  $scope.ratings = [1, 2, 3, 4, 5]; // A variable that is intened only for the view!

  $scope.addBeer = function(name, style, abv, image) {
    beerService.addBeer(name, style, abv, image).then(function(beer) { // I got from the server's response a beer (to be added)
      $scope.beers.push(beer);
    }, function(err) {
      console.error(err);
    });
  }

  $scope.removeBeer = function(id) {
    beerService.removeBeer(id).then(function(beer) {
      // I got from the server's response a beer (to be removed)
      for (var i = 0; i < $scope.beers.length; i++) {
        if (id === $scope.beers[i]._id) {
          $scope.beers.splice(i, 1);
        }
      }
    }, function(err) {
      console.error(err);
    });
  };

  // This is just a VIEW function
  $scope.avg = function(beer){
    var avg = 0;
    for (var i = 0; i < beer.ratings.length; i++) {
        avg += beer.ratings[i];
    }
    avg /= beer.ratings.length;
    return avg;
  }

  $scope.addRating = function(beer_rating, $index, id) {
    if (typeof(beer_rating) != 'number') {
      return;
    }
    beerService.addRating(beer_rating, id).then(function(beer) {
        $scope.beers[$index] = beer; // the *view* beer equals the returned beer
    }, function(err) {
      console.error(err);
    });
  };

  $scope.updateBeers = function($index, id) {
    console.log("hello");
  /*  $http.put('/beers/' + id, beerService.beers[$index]).then(function(response) {
      beerService.getBeers();
      console.log(response);
    })*/
  };

  beerService.getBeers().then(function(beers) { // I got from the server's response beers (to be shown)
    $scope.beers = beers;
  });
}]);
