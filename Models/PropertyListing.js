const mongoose = require('mongoose');

const propertyListingSchema = new mongoose.Schema({
image:String,
  title: String,
  description: String,
  location: String,
  price: String,
});

const PropertyListing = mongoose.model('PropertyListing', propertyListingSchema);

module.exports = PropertyListing;
