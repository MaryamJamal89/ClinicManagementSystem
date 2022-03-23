const { validationResult } = require("express-validator");
const Doctor = require("./../Models/doctor");
const Recep = require("./../Models/receptionist");
const jwt = require("jsonwebtoken");

//User Login
exports.Login = (request, response, next) => {
    let errors = validationResult(request);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors
            .array()
            .reduce((current, object) => current + object.msg + " , ", "");
        next(error);
    } else {
        //input came from user 
        let insertedusername = request.body.userName;
        let insertedPassword = request.body.password;

        //Search On Resciptionist in database 
        Doctor.findOne({ userName: insertedusername })
            .then((result) => {
                //No Doctor is found  
                if (!result) {
                    //Search On Resciptionist in database 
                    Recep.findOne({ userName: insertedusername }).then((result2) => {
                        //No data Is Found 
                        if (!result2) console.log("wrong username");
                        //Found resp
                        else if (result2.password == insertedPassword) {
                            //JWT Auth......
                            let token = jwt.sign({
                                userName: result2.body.userName,
                                id: result2.body._id,
                                role: "Rescptionist",
                            }, "ITI", { expiresIn: "1h" });
                            response.status(200).json({ message: "Rescptionist", object: result, token: token });
                        } else {
                            response.status(201).json({ message: "Password is Wrong" });
                        }
                    });
                    //Docotor is found 
                } else if (result.password == insertedPassword) {
                    //JWT Auth......
                    let token = jwt.sign({
                        userName: result.body.userName,
                        id: result.body._id,
                        role: "Doctor",
                    }, "ITI", { expiresIn: "1h" });
                    response.status(201).json({ message: "Doctor", object: result });
                } else {
                    response.status(201).json({ message: "Password is Wrong" });
                }
            })
            .catch((error) => {
                error.status = 500;
                next(error);
            });
    }
};