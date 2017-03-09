app.controller('beerCtrl', ['$scope','beerService', function($scope, beerService) {
  $scope.beerObj = beerService.beerObj;
  }]);
