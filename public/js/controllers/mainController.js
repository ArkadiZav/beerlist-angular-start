app.controller('beerCtrl', ['$scope','beerService', function($scope, beerService) {
  $scope.ratings = [1, 2, 3, 4, 5]; // A variable that is intened only for the view!
  $scope.isSortAscending = true;

  //this is an array to store the copy we make of our beer for editing purposes
  $scope.tempBeer = [];

  // everytime I want to edit, I take the beer from my array (which resembles the server's)
  // and and put it into the tempBeer array.
  // The REASON we need a temp beer array and not just tempBeer variable - is because we can simultaneously, without
  // refreshing, edit several beers.
  $scope.editBeer = function(index) {
    //copy the beer to be edited into a position on the tempBeer array
    $scope.tempBeer[index] = angular.copy($scope.beers[index]);
  };

  $scope.addBeer = function(name, style, abv, image) {
    beerService.addBeer(name, style, abv, image).then(function(beer) { // I got from the server's response a beer (to be added)
      $scope.beers.push(beer);
    }, function(err) {
      console.error(err);
    });
  }

  $scope.removeBeer = function(index) {
    var toBeRemovedBeer = $scope.beers[index];
    beerService.removeBeer(toBeRemovedBeer._id).then(function(beer) {
      // I got from the server's response a beer (to be removed)
      $scope.beers.splice(index, 1);
    }, function(err) {
      console.error(err);
    });
  };

  // ########### Steven's version of removing ##############
  // $scope.removeBeer = function(id) {
  //   var toBeRemovedBeer = $scope.beers[index];
  // //  beerService.removeBeer(toBeRemovedBeer._id).then(function(beer)
  //   beerService.removeBeer(id).then(function(beer) {
  //     // I got from the server's response a beer (to be removed)
  //     for (var i = 0; i < $scope.beers.length; i++) {
  //       if (id === $scope.beers[i]._id) {
  //         $scope.beers.splice(i, 1);
  //       }
  //     }
  //   }, function(err) {
  //     console.error(err);
  //   });
  // };

  // This is just a VIEW function
  $scope.avg = function(beer) {
    var avg = 0;
    for (var i = 0; i < beer.ratings.length; i++) {
        avg += beer.ratings[i];
    }
    avg /= beer.ratings.length;
    return avg;
  }

  $scope.addRating = function($index, beer_rating, id) {
    // ## When pressing "select" on select rating: we just ignore ## //
    if (typeof(beer_rating) != 'number') {
      return;
    }
    beerService.addRating($index, beer_rating, id).then(function(beer) {
        $scope.beers[$index] = beer; // the *view* beer equals the returned beer
    }, function(err) {
      console.error(err);
    });
  };

  $scope.editBeerInfo = function(beer) {
    beerService.editBeerInfo(beer).then(function(updatedBeer) {
    }, function(err) {
      console.error(err);
    });
  };

  // This is the NEW way to update : week7 - lesson 1
  $scope.updateBeer = function(index) {
    //pass the modified beer in the tempBeer array to our factory
    beerService.editBeerInfo($scope.tempBeer[index])
      .then(function(updatedBeer) {
        //if all goes OK the server sends back the updated beer
        $scope.beers[index] = updatedBeer; // ONLY THEN I change the beers in the view
      }, function(err) {
        //if there has been a problem then alert it
        alert(err.data.message);
      })
      .then(function() {
        //finally, success or error, we need to clear the tempBeer so the view updates
        $scope.tempBeer[index] = null;
      })
  };

  $scope.sortAscending = function() {
    console.log("asc");
    $scope.beers.sort(function(a, b){return $scope.avg(a) - $scope.avg(b)});
    $scope.isSortAscending = false;
  }

  $scope.sortDescending = function() {
    console.log("desc");
    $scope.beers.sort(function(a, b){return $scope.avg(b) - $scope.avg(a)});
    $scope.isSortAscending = true;
  }

  beerService.getBeers().then(function(beers) { // I got from the server's response beers (to be shown)
    $scope.beers = beers;
  });
}]);
