const express = require("express");
const app = express();

const mongoose = require("mongoose");


app.get("/",(req,res)=>{
    res.send("Yess, working on root");
})
app.listen(8080, ()=>{
    console.log("It is live on port 8080");
})