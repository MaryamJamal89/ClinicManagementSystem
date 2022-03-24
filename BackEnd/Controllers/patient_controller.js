////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
const Patient = require("./../Models/patient");

////////////////////////////////////////GET///////////////////////////////////////////////////////////
exports.getPatients = function(request, response, next) {
    Patient.find({})
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));
}
exports.getPatientsbyID = function(request, response, next) {
    Patient.findOne({_id:request.params.id})
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));
}
////////////////////////////////////////POST//////////////////////////////////////////////////////////
exports.createPatient = (request, response, next) => {
    //validation result
    let patientObject = new Patient({
        NID: request.body.NID,
        name: request.body.name,
        gender: request.body.gender,
        DOB: request.body.DOB,
        phoneNumber: request.body.phoneNumber,
    })

    patientObject.save()
        .then(result => {
            response.status(201).json({ message: "added" })
        }).catch(error => console.log(error))
}