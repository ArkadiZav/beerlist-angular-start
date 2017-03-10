app.factory('beerService', function($http) {
  var beers = [{name: "Carlsberg", ratings: [3, 2], avgRating: 2.5, style: "light", abv: 5, image_url: "http://vector.me/files/images/4/1/41842/carlsberg.png"},
               {name: "Heiniken", ratings: [4, 5], avgRating: 4.5, style: "imported", abv: 3, image_url: "http://logok.org/wp-content/uploads/2014/06/Heineken-logo-green.png"},
               {name: "Corona 1", ratings: [4], avgRating: 4, style: "light", abv: 5.9, image_url: "http://fontslogo.com/wp-content/uploads/2013/04/Corona-Logo-Font.jpg"}];

  var beerObj = {beers: beers};

  beerObj.getBeers = function() {
  // your code
  }

  beerObj.addBeer = function(name, rating, style, abv, image) {
    var newBeer = {name: name, ratings:[rating], avgRating:rating, style: style, abv: abv, image_url: image};
    beerObj.beers.push(newBeer);
    console.log(beerObj.beers);
  };

  beerObj.removeBeer = function($index) {
    beerObj.beers.splice($index, 1);
  };

  beerObj.addRating = function(beer_rating, $index) {
    var avgRating = beerObj.beers[$index].avgRating;
    numOfRatings = beerObj.beers[$index].ratings.length;
    beerObj.beers[$index].ratings.push(beer_rating);
    beerObj.beers[$index].avgRating = (avgRating * numOfRatings + parseInt(beer_rating))/(numOfRatings + 1);
  };

  return {
    beerObj: beerObj
  };

});
