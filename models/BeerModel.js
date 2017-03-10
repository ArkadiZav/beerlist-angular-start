var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beerSchema = new Schema ({
  name: {type: String},
  abv: {type: Number},
  style: {type: String},
  image_url: {type: String}
  // add further properties according to our beers array
});

var Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;
