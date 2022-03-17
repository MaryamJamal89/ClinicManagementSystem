const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    clinic_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "clinic"
    },
    userName: {
        type: String,
        minlength: 2,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minlength: 3,
        trim: true,
        required: true
    },
    rating: {
        type: Number,
        minlength: 0,
        maxlength: 5,
        default: 3
    }
});

const doctor = mongoose.model('doctor', doctorSchema);
module.exports = doctor;