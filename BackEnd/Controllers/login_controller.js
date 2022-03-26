const { validationResult } = require("express-validator");
const Doctor = require("./../Models/doctor");
const Recep = require("./../Models/receptionist");
const jwt = require("jsonwebtoken");

// user login function
const verifyUserLogin = async (userName, password) => {
  try {
    const doctorUser = await Doctor.findOne({ userName }).lean();
    console.log(doctorUser)
    if (!doctorUser) {
        console.log("null doc ")
      const respUser = await Recep.findOne({ userName }).lean();
      if (!respUser) {
        return { status: "error", error: "user not found" };
      } else if (respUser.password == password) {
        // creating a JWT token
         token = jwt.sign(
          {
            userName: respUser.userName,
            id: respUser._id,
            role: "Rescptionist",
          },
          "ITI",
          { expiresIn: "1h" }
        );
        return { status: "ok", data: token,massage:"Rescptionist",userName:respUser.userName,id:respUser._id};
      }
      return { status: "error", error: "invalid password" };
    }
    else if (doctorUser.password == password) {
      // creating a JWT token
       token = jwt.sign(
        {
          userName: doctorUser.userName,
          id: doctorUser._id,
          role: "Doctor",
        },
        "ITI",
        { expiresIn: "1h" }
      );
      return { status: "ok", data: token ,massage:"Doctor",userName:doctorUser.userName,id:doctorUser._id};
    }
  } catch (error) {
    console.log(error);
    return { status: "error", error: "timed out" };
  }
};


//User Login
exports.Login = async(req,res)=>{
    let errors = validationResult(req);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  }
    const {userName,password}=req.body;
    // we made a function to verify our user login
    const response = await verifyUserLogin(userName,password);
    if(response.status==='ok'){
        // storing our JWT web token as a cookie in our browser
        res.cookie('token',token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
        res.json(response);
        // maxAge: 2 hours
        //res.redirect('/');
    }else{
        res.json(response);
    }
}
