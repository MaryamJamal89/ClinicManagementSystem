require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const session = require('express-session');



const clinicroute = require('./Routers/clinic_router');
const doctorroute = require('./Routers/doctor_router');
const receptionistroute = require('./Routers/recep_router');
const patientroute = require('./Routers/patient_router');
const loginroute = require('./Routers/login_router');
const appointroute = require('./Routers/appointment_router');
const prescriptionroute = require('./Routers/prescription_router');

// session
app.use(session({
    secret: 'youtube_video',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

////////////////////////////////////////////////////////////////
mongoose.connect("mongodb+srv://Randa:1234@cluster0.e3oxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
    app.listen(8080, () => {
        console.log("I am listening ......")
    });
}).catch(err => console.log(err))


//************************* MiddleWares */
// app.use(function(req, res, next) {
//     if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//       jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
//         if (err) req.user = undefined;
//         req.user = decode;
//         next();
//       });
//     } else {
//       req.user = undefined;
//       next();
//     }
//   });
app.use((request,response,next)=>{

    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS");
    response.header("Access-Control-Allow-Headers","Content-Type,Authorization")
    next();

})
//firstMW--> save log file
app.use((request, response, next) => {
    console.log(request.url, request.method);
    next();
});

//----------------------------------------------------routing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//---- Routers (End points)
app.use("/home", (request, response) => {
    response.send("HOME PAGE");
});
app.use("/clinic", clinicroute);
app.use("/doctor", doctorroute);
app.use("/receptionist", receptionistroute);
app.use("/patient", patientroute);
app.use("/login", loginroute);
app.use("/appointments", appointroute);
app.use("/prescription", prescriptionroute);

app.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if (req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

//----- Not found MW
app.use((request,response)=>{
    // response.status(404).json({data:"Page Not Found"});
    response.redirect("/error")
})

//------------------------- Error MW
app.use((error, request, response, next) => {
    error.status = error.status || 500;
    response.status(error.status).send("Error Page " + error);

})