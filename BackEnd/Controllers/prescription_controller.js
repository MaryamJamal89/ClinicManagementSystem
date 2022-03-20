////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
const prescription = require("./../Models/prescription");

////////////////////////////////////////GET///////////////////////////////////////////////////////////
exports.getPrescription = function(request, response, next) {
    prescription.find({})
        .then((prescription) => res.send(prescription))
        .catch((error) => console.log(error));
}

exports.getbyDoctor = function(request, response, next) {
    prescription.find({ doctorID: req.params.doctor_id })
        .then((prescription) => res.send(prescription))
        .catch((error) => console.log(error));
}

////////////////////////////////////////POST//////////////////////////////////////////////////////////
exports.postPrescription = (req, res) => {
    (
        new prescription({
            'medecineName': req.body.medecineName,
            'amountDescription': req.body.amountDescription,
            'doctorID': req.body.doctorID,
            'patientID': req.body.patientID
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