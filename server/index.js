const express = require("express");
const cors = require("cors")
const mongoose = require('mongoose')

const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())

app.get('/',(req,res) =>{
  res.send("welcome")
})




const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;


app.listen(port, (req, res) => {
    console.log(`server run: ${port}`)
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongoDB connection"))
    .catch((error) => console.log("mongoDB connection fail:", error.message))