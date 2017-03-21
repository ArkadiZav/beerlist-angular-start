var app = angular.module('beerList', ["xeditable", 'ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'beerCtrl',
      templateUrl: '/templates/home.html'
    })
    .state('beer', {
      url: '/beers/:id',
      controller: 'beerController',
      templateUrl: '/templates/beer.html',
      params: {
        beerParam: null
      }
    });

  $urlRouterProvider.otherwise('/home');
}]);
