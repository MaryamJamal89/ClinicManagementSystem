const mongoose = require('mongoose');
const prescriptionSchema = new mongoose.Schema({
    medecineName: {
        type: String,
        required: true
    },
    amountDescription: {
        type: String,
        required: true
    },
    doctorID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "doctor"

    },
    patientID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "patient"
    }
});

const prescription = mongoose.model('prescription', prescriptionSchema);
module.exports = prescription;