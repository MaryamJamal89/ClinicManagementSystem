////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
const { findOne } = require("./../Models/appointment");
const appoint = require("./../Models/appointment");
const Doctor = require("./../Models/doctor");
const Patient = require("./../Models/patient");


////////////////////////////////////////GET///////////////////////////////////////////////////////////
exports.getAppoints = function(request, response, next) {
    appoint.find({})
        //.populate({ path: "doctor", strictPopulate: false }, { path: "patient", strictPopulate: false })
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));
}

exports.getAppointsByID = function(req, res) {
    appoint.findOne({ _id: req.params.id })
        .then((appoint) =>{
            Doctor.findOne({_id:appoint.doctorID})
            .then((doctor)=>{
                Patient.findOne({_id:appoint.patientID})
                .then((patient)=>{
                    res.status(200).json({"Appointment":appoint,"Doctor":doctor,"Patient":patient})
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
}


////////////////////////////////////////POST//////////////////////////////////////////////////////////
exports.createAppoints = (request, response) => {
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
            response.status(201).json(result)
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
