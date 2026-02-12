const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("../models/listing");
const initData = require("./data.js");

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Yess! Connected to DB!");
  })
  .catch((err) => console.log(err));

async function initDB() {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  console.log("DB Initialized with sample data");
}

initDB()
  .then(() => {
    console.log("DB Initialization complete!");
  })
  .catch((err) => console.log(err));
