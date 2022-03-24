const mongoose = require('mongoose');
const prescriptionSchema = new mongoose.Schema({
    medicineName: {
        type: String,
        required: true
    },
    amountDescription: {
        type: String,
        required: true
    },
    appointmentID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "appointment"
    },
});

const prescription = mongoose.model('prescription', prescriptionSchema);
module.exports = prescription;