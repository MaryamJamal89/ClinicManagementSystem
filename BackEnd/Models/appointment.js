const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
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
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        name:{
            type:String,
            required: true
        },
        fees:{
            type:Number,
            required:true
        }
    },
    date: Date,
    period: {
        type: Number,
        minlength: 1,
        maxlength: 5,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "visa", "insurance"],
        required: true
    },
    fees: Number
});

const appointment = mongoose.model('appointment', appointmentSchema);
module.exports = appointment;