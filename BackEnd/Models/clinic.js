const mongoose = require('mongoose');
const clinicSchema = new mongoose.Schema({
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
        fees: Number
    }]
});

const clinic = mongoose.model('clinic', clinicSchema);
module.exports = clinic;