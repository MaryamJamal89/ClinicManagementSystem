////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
const Doctor = require("./../Models/doctor");

////////////////////////////////////////GET///////////////////////////////////////////////////////////
exports.getDoctors = function(request, response, next) {
    Doctor.find({})
        .populate({ path: "clinic", strictPopulate: false })
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));


}
exports.getDoctorsByID = function(request, response, next) {
    Doctor.find({_id:request.params.id})
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));


}

////////////////////////////////////////POST//////////////////////////////////////////////////////////
exports.createDoctor = (request, response, next) => {
    //validation result
    let doctorObject = new Doctor({
        clinic_id: request.body.clinic_id,
        userName: request.body.userName,
        password: request.body.password,
        rating: request.body.rating,
    })

    doctorObject.save()
        .then(result => {
            response.status(201).json({ message: "added" })
        }).catch(error => console.log(error))
}