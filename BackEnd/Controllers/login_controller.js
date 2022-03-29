const { validationResult } = require("express-validator");
const Doctor = require("./../Models/doctor");
const Recep = require("./../Models/receptionist");
const jwt = require("jsonwebtoken");

// user login function
const verifyUserLogin = async (userName, password, type) => {
  try {
    if (type == "Doctor") {
      const doctorUser = await Doctor.findOne({ userName }).lean();
      console.log(doctorUser);
      if (!doctorUser) {
        return { status: "error", error: "user not found" };
      } else if (doctorUser.password == password) {
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
        return {
          status: "ok",
          data: token,
          massage: "Doctor",
          id: doctorUser._id,
        };
      }
      return { status: "error", massage: "invalid password" };
    }
    if (type == "Receptionist") {
      const respUser = await Recep.findOne({ userName }).lean();

      if (!respUser) {
        return { status: "error", massage: "user not found" };
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
        return {
          status: "ok",
          data: token,
          massage: "Rescptionist",
          id: respUser._id,
        };
      }
      return { status: "error", massage: "invalid password" };
    }
  } catch (error) {
    console.log(error);
    return { status: "error", error: "timed out" };
  }
};

//User Login
exports.Login = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  }
  const { userName, password, type } = req.body;
  // we made a function to verify our user login
  const response = await verifyUserLogin(userName, password, type);
  if (response.status === "ok") {
    // storing our JWT web token as a cookie in our browser
    res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
    res.json(response);
    // maxAge: 2 hours
    //res.redirect('/');
  } else {
    res.json(response);
  }
};
