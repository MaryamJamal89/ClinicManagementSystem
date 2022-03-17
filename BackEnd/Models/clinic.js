const mongoose = require('mongoose');
const clinicSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "patient"
    },
    location: {
        city: {
            type: String,
            enum: ["Cairo", "Mansoura", "Alexandria"],
            required: true
        },
        street: {
            type: String,
            minlength: 2,
            trim: true,
            required: true
        },
    },
    services: [{
        name: String,
        price: Number
    }]
});

const clinic = mongoose.model('clinic', clinicSchema);
module.exports = clinic;