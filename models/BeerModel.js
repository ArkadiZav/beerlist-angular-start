var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema ({
    name: {type: String},
    text: {type: String}
});

var beerSchema = new Schema ({
  name: {type: String, required: true},
  ratings: [{type: Number}],
  abv: {type: Number, required: true},
  style: {type: String, required: true},
  image_url: {type: String, required: true},
  reviews: [reviewSchema] // each beer has an array of reviews (of names and comments)
});

var Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;
