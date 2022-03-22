const { validationResult } = require("express-validator");
const Doctor = require("./../Models/doctor");
const Recep = require("./../Models/receptionist");

//User Login
exports.Login = (request, response, next) => {

    let errors = validationResult(request);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " , ", "");
        next(error);
    } else {

        let insertedusername = request.body.userName;
        let insertedPassword = request.body.password;
        Doctor.findOne({ userName: insertedusername })
            .then(result => {
                if (result == null) {
                    Recep.findOne({userName: insertedusername}) .then(result=>{
                        if (result == null) console.log('wrong username')
                        if (result.password == insertedPassword) {
                            response.status(201).json({ message: "Logged" });
                        } else {
                            response.status(201).json({ message: "Password is Wrong" });
                        }
                    })
                };
                if (result.password == insertedPassword) {
                    response.status(201).json({ message: "Logged" });
                } else {
                    response.status(201).json({ message: "Password is Wrong" });
                }
            })
            .catch(error => {
                error.status = 500;
                next(error);
            });

    }


};