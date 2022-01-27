//import express
const express = require("express");
//import router
const router = require("./routes/api.js");

//membuat objek express
const app = express();

//add middleware
app.use(express.json());
app.use(express.urlencoded());

//use router
app.use(router);

//definisikan port
app.listen(3000, () => {
    console.log("server runing on http://localhost:3000/");
});
