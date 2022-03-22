////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
const appoint = require("./../Models/appointment");

////////////////////////////////////////GET///////////////////////////////////////////////////////////
exports.getAppoints = function(request, response, next) {
    appoint.find({})
        //.populate({ path: "doctor", strictPopulate: false }, { path: "patient", strictPopulate: false })
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));
}

exports.getAppointsId = function(req, res) {
    appointment.find({ date: req.params.app_date, doctorID: req.params.doctor_id })
        .then((doctors) => res.send(doctors))
        .catch((error) => console.log(error));
}


////////////////////////////////////////POST//////////////////////////////////////////////////////////
exports.createAppoints = (request, response, next) => {
    //validation result
    let appointObject = new appoint({
        doctorID: request.body.doctorID,
        patientID: request.body.patientID,
        service: request.body.service,
        startDate: request.body.startDate,
        endDate: request.body.endDate,
        paymentMethod: request.body.paymentMethod,
        fees: request.body.fees,
    })

    appointObject.save()
        .then(result => {
            response.status(201).json({ message: "added" })
        }).catch(error => console.log(error))
}

////////////////////////////////////////Update//////////////////////////////////////////////////////////
exports.updAteappoints = (request, response) => {
        appoint.updateOne({ _id: request.body.id }, {
                $set: {
                    doctorID: request.body.doctorID,
                    patientID: request.body.patientID,
                    service: request.body.service,
                    date: request.body.date,
                    period: request.body.period,
                    paymentMethod: request.body.paymentMethod,
                    fees: request.body.fees,
                }
            }).then(result => {
                response.status(201).json({ message: "Updated" })
            })
            .catch(error => {
                error.status = 500;
                next(error);
            })

    }
    ////////////////////////////////////////DELETE//////////////////////////////////////////////////////////
exports.deleteAppoints = (req, res,next) => {
    appoint.findByIdAndDelete(req.params.Id)
    .then(result => {
        res.status(200).json({ message: "Deleted" })
    })
    .catch(error => next(error));
}
