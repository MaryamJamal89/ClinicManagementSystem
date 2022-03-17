const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const appointment = require('./database/models/appointment');
const clinic = require('./database/models/clinic');
const doctor = require('./database/models/doctor');
const patient = require('./database/models/patient');
const prescription = require('./database/models/prescription');
const receptionist = require('./database/models/receptionist');

const server = express();

mongoose.connect("mongodb+srv://Randa:1234@cluster0.e3oxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
    server.listen(8080, () => {
        console.log("I am listening ......")
    });
}).catch(err => console.log(err))