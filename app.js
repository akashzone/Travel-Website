const express = require("express");
const app = express();

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

const methodOverride = require("method-override");
app.use(methodOverride("_method"));


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

app.get("/listings/new",(req,res)=>{
  res.render("new.ejs");
});
 
app.post("/listings",async (req,res)=>{
  const listing = new Listing(req.body.listing);
  await listing.save();
  res.redirect("/listings");
});

app.get("/listings/:id/edit",async (req,res)=>{
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("edit.ejs",{listing});
});

app.put("/listings/:id",async (req,res)=>{
  const {id} = req.params;
  const listing = await Listing.findByIdAndUpdate(id,req.body.listing);
  res.redirect(`/listings/${listing._id}`);
});

app.delete("/listings/:id",async (req,res)=>{
  const {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

app.get("/listings/:id",async (req,res)=>{
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("show.ejs",{listing});
})



app.listen(8080, () => {
  console.log("It is live on port 8080");
});
