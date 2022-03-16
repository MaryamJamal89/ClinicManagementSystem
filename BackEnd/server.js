const express = require("express");
const path = require('path');
const mongoose = require('mongoose');

const server = express();

mongoose.connect("mongodb+srv://Randa:1234@cluster0.e3oxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
    server.listen(8080, () => {
        console.log("I am listening ......")
    });
}).catch(err => console.log(err))