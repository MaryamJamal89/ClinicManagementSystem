////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
const Recep = require("./../Models/receptionist");

////////////////////////////////////////GET///////////////////////////////////////////////////////////
exports.getRecep = function(request, response, next) {
    Recep.find({})
        .populate({ path: "clinic", strictPopulate: false })
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));


}

////////////////////////////////////////POST//////////////////////////////////////////////////////////
exports.createRecep = (request, response, next) => {
    //validation result
    let clinicObject = new Recep({
        clinic_id: request.body.clinic_id,
        userName: request.body.userName,
        password: request.body.password,
        permissions: request.body.permissions,
    })

    clinicObject.save()
        .then(result => {
            response.status(201).json({ message: "added" })
        }).catch(error => console.log(error))
}