////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
const prescription = require("./../Models/prescription");

////////////////////////////////////////GET///////////////////////////////////////////////////////////
exports.getPrescription = function(request, response, next) {
    prescription.find({})
        .then((prescription) => res.send(prescription))
        .catch((error) => console.log(error));
}

exports.getbyDoctor = function(request, response, next) {
    prescription.find({ doctorID: request.params.doctor_id })
        .then((prescription) => response.send(prescription))
        .catch((error) => console.log(error));
}

////////////////////////////////////////POST//////////////////////////////////////////////////////////
exports.postPrescription = (req, res) => {
    (
        new prescription({
            'medicineName': req.body.medicineName,
            'amountDescription': req.body.amountDescription,
            'appointmentID': req.body.appointmentID,
        }))
    .save()
        .then((prescription) => res.send(prescription))
        .catch((error) => console.log(error));
}

////////////////////////////////////////DELETE//////////////////////////////////////////////////////////

exports.deletePrescription = (req, res) => {
    prescription.findByIdAndDelete(req.params.prescriptionId)
        .then((prescription) => res.send(prescription))
        .catch((error) => console.log(error));
}