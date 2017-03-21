app.controller('beerController', ['$scope', '$stateParams', 'beerService', function($scope, $stateParams, beerService) {
  // ### PROBLEMS now happen when we refresh the page ###
  // when we refreshed the page the beer state wasn't passed any parameters.
  // It only gets the beerParam when we click on the link we created.
  if (!$stateParams.beerParam) {
    beerService.getBeer($stateParams.id)
      .then(function(beer) {
        $scope.beer = beer;
      })
  } else {
    // which beer are we reviewing now? The following one:
    $scope.beer = $stateParams.beerParam; // which we got by clicking on the Review link we created
    }

    // The ELSE handles what happens when we clicked on the Reviews link in the homepage
    // The IF handles what happens if we refresh the reviews page for a specific beer

    $scope.addReview = function(name, comment, beer) {
      beerService.addReview(name, comment, beer).then(function(review) { // I got from the server's response a beer (to be added)
      $scope.beer.reviews.push(review);
      beerService.getBeer($stateParams.id)
        .then(function(beer) {
          $scope.beer = beer;
        })
       }, function(err) {
        console.error(err);
       });
    }

    $scope.removeReview = function(index) {
      console.log("removing");
      var toBeRemovedReview = $scope.beer.reviews[index];
      console.log(toBeRemovedReview._id);
      beerService.removeReview(toBeRemovedReview._id, $scope.beer._id).then(function(review) {
        // I got from the server's response a review (to be removed)
        $scope.beer.reviews.splice(index, 1);
      }, function(err) {
        console.error(err);
      });
    };
}]);
