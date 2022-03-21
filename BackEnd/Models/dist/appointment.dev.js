"use strict";

var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
  doctorID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "doctor"
  },
  patientID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "patient"
  },
  service: {
    name: {
      type: String,
      required: true
    },
    fees: {
      type: Number,
      required: true
    }
  },
  startDate: Date,
  endDate: Date,
  paymentMethod: {
    type: String,
    "enum": ["cash", "visa", "insurance"],
    required: true
  },
  fees: Number
});
var appointment = mongoose.model('appointment', appointmentSchema);
module.exports = appointment;