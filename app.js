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


//Show route for all listings
app.get("/listings",async (req,res)=>{
  const listings = await Listing.find({});
  res.render("listings.ejs",{listings});
})

app.get("/listings/:id",async (req,res)=>{
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("show.ejs",{listing});
})

app.listen(8080, () => {
  console.log("It is live on port 8080");
});
