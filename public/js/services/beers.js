app.factory('beerService', function() {
  var beers = [{name: "Kentucky Brunch", style: "Imperial stout", abv: 12, imageUrl: "http://www.mybeercollectibles.com/uploads/cache/IMG_0225-(1)-500x500-crop.JPG"},
               {name: "Good Morning", style: "Imperial stout", abv: 8.4, imageUrl: "https://cdn.beeradvocate.com/im/c_beer_image.gif"},
               {name: "JJJuliusss", style: "American IPA", abv: 6.8, imageUrl: "https://cdn.beeradvocate.com/im/c_beer_image.gif"},
               {name: "Sip Of Sunshine", style: "Imperial IPA", abv: 8, imageUrl: "https://cdn.beeradvocate.com/im/c_beer_image.gif"}];

  var myBeers = [];

  var beerObj = {beers: beers, myBeers: myBeers};
  console.log(beerObj);

  return {
    beerObj: beerObj
  };

});
