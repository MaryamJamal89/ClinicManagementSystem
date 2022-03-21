"use strict";

////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
var appoint = require("./../Models/appointment"); ////////////////////////////////////////GET///////////////////////////////////////////////////////////


exports.getAppoints = function (request, response, next) {
  appoint.find({}) //.populate({ path: "doctor", strictPopulate: false }, { path: "patient", strictPopulate: false })
  .then(function (result) {
    response.status(200).json(result);
  })["catch"](function (error) {
    return next(error);
  });
};

exports.getAppoints = function (req, res) {
  appointment.find({
    date: req.params.app_date,
    doctorID: req.params.doctor_id
  }).then(function (doctors) {
    return res.send(doctors);
  })["catch"](function (error) {
    return console.log(error);
  });
}; ////////////////////////////////////////POST//////////////////////////////////////////////////////////


exports.createAppoints = function (request, response, next) {
  //validation result
  var appointObject = new appoint({
    doctorID: request.body.doctorID,
    patientID: request.body.patientID,
    service: request.body.service,
    date: request.body.date,
    period: request.body.period,
    paymentMethod: request.body.paymentMethod,
    fees: request.body.fees
  });
  appointObject.save().then(function (result) {
    response.status(201).json({
      message: "added"
    });
  })["catch"](function (error) {
    return console.log(error);
  });
}; ////////////////////////////////////////Update//////////////////////////////////////////////////////////


exports.updAteappoints = function (request, response) {
  appoint.updateOne({
    _id: request.body.id
  }, {
    $set: {
      doctorID: request.body.doctorID,
      patientID: request.body.patientID,
      service: request.body.service,
      date: request.body.date,
      period: request.body.period,
      paymentMethod: request.body.paymentMethod,
      fees: request.body.fees
    }
  }).then(function (result) {
    response.status(201).json({
      message: "Updated"
    });
  })["catch"](function (error) {
    error.status = 500;
    next(error);
  });
}; ////////////////////////////////////////DELETE//////////////////////////////////////////////////////////


exports.deleteAppoints = function (req, res) {
  appointment.findByIdAndDelete(req.params.appointmentId).then(function (appointment) {
    return res.send(appointment);
  })["catch"](function (error) {
    return console.log(error);
  });
};