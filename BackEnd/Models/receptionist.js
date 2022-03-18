const mongoose = require('mongoose');
const receptionistSchema = new mongoose.Schema({
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
    permissions: {
        type: String,
        enum: ["S", "J"],
        required: true
    }

});

const receptionist = mongoose.model('receptionist', receptionistSchema);
module.exports = receptionist;