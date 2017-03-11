var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beerSchema = new Schema ({
  name: {type: String, required: true},
  ratings: [{type: Number}],
  avgRating: {type: Number},
  abv: {type: Number, required: true},
  style: {type: String, required: true},
  image_url: {type: String, required: true}
  // add further properties according to our beers array
});

var Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;
