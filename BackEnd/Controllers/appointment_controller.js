////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
const appoint = require("./../Models/appointment");

////////////////////////////////////////GET///////////////////////////////////////////////////////////
exports.getappoints = function(request, response, next) {
    appoint.find({})
        .populate({ path: "doctor", strictPopulate: false }, { path: "patient", strictPopulate: false })
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));


}

////////////////////////////////////////POST//////////////////////////////////////////////////////////
exports.createappoints = (request, response, next) => {
    //validation result
    let appointObject = new appoint({
        doctorID: request.body.doctorID,
        patientID: request.body.patientID,
        service: request.body.service,
        date: request.body.date,
        period: request.body.period,
        paymentMethod: request.body.paymentMethod,
        fees: request.body.fees,
    })

    appointObject.save()
        .then(result => {
            response.status(201).json({ message: "added" })
        }).catch(error => console.log(error))
}