const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


const clinicroute = require('./Routers/clinic_router');
const doctorroute = require('./Routers/doctor_router');
const receptionistroute = require('./Routers/recep_router');
const patientroute = require('./Routers/patient_router');
// const appointment = require('./database/models/appointment');
// const prescription = require('./database/models/prescription');


mongoose.connect("mongodb+srv://Randa:1234@cluster0.e3oxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
    app.listen(8080, () => {
        console.log("I am listening ......")
    });
}).catch(err => console.log(err))


//************************* MiddleWares */
//firstMW--> save log file
app.use((request, response, next) => {
    console.log(request.url, request.method);
    next();
});

//----------------------------------------------------routing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use("/home", (request, response) => {
    response.send("HOME PAGE");
});
app.use("/clinic", clinicroute);
app.use("/doctor", doctorroute);
app.use("/receptionist", receptionistroute);
app.use("/patient", patientroute);

app.use((request, response, next) => {
    response.send("HELOo ");

});

//------------------------- Error MW
app.use((error, request, response, next) => {
    error.status = error.status || 500;
    response.status(error.status).send("Error Page " + error);

})