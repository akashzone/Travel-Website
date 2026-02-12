const express = require("express");
const app = express();

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing");

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Yess! Connected to DB!");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Yess, working on root");
});

app.get("/Listings",async (req,res)=>{
  const listings = await Listing.find({});
  res.render("listings.ejs",{listings});
})

app.get("/testlisting", async (req,res) => {
  const sampleListing = new Listing({
    title: "New Villa",
    description: "By near Beach",
    price: 1300,
    location: "Dadar, Mumbai",
    country: "India",
  });

  await sampleListing
    .save()
    .then(() => {
      console.log(sampleListing);
    })
    .catch((err) => console.log(err));
  res.send("Yes! Saved in DB");
});
app.listen(8080, () => {
  console.log("It is live on port 8080");
});
