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