const express = require("express");
const app = express();

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);    
}

main().then(()=>{
    console.log("Yess! Connected to DB!");
}).catch(err =>
    console.log(err)
)

app.get("/",(req,res)=>{
    res.send("Yess, working on root");
})
app.listen(8080, ()=>{
    console.log("It is live on port 8080");
})