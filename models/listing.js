const mongoose = require("mongoose");

const Schema = mongoose.Schema; // Schema

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    image: {
      type: {
        filename: String,
        url: String,
      },
      default: {
        filename: "listingimage",
        url: "https://unsplash.com/photos/a-stone-building-with-a-stone-wall-and-trees-around-it-dDFLiUgpdx0",
      },
    },
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
