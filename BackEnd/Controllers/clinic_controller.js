////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
const Clinic = require("./../Models/clinic");

////////////////////////////////////////GET///////////////////////////////////////////////////////////
exports.getClinic = function(request, response, next) {
    Clinic.find({})
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));
}
exports.getServiceName = function(request, response, next) {
    Clinic.findOne({},{
        services:{$elemMatch:{_id : request.body.serviceid}},_id:0})
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));
}

////////////////////////////////////////POST//////////////////////////////////////////////////////////
exports.createClinic = (request, response, next) => {
    //validation result
    let clinicObject = new Clinic({
        location: request.body.location,
        services: request.body.services,
    })

    clinicObject.save()
        .then(result => {
            response.status(201).json({ message: "added" })
        }).catch(error => console.log(error))
}