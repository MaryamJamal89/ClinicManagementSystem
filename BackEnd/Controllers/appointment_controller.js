////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
const appoint = require("./../Models/appointment");

////////////////////////////////////////GET///////////////////////////////////////////////////////////
exports.getappoints = function(request, response, next) {
    appoint.find({})
        //.populate({ path: "doctor", strictPopulate: false }, { path: "patient", strictPopulate: false })
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));


}
// exports.getappoints = function(req, res) {
//     appointment.find({ date: req.params.app_date, doctorID: req.params.doctor_id })
//         .then((doctors) => res.send(doctors))
//         .catch((error) => console.log(error));
// }

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

////////////////////////////////////////DELETE//////////////////////////////////////////////////////////S
exports.deleteappoints = (req, res) => {
    appointment.findByIdAndDelete(req.params.appointmentId)
        .then((appointment) => res.send(appointment))
        .catch((error) => console.log(error));
}