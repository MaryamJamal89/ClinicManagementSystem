////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
const Doctor = require("./../Models/doctor");
const multer = require("multer");

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
    Doctor.findOne({_id:request.params.id})
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));
}

exports.getImage = function (request, response, next) {
    response.download("../uploads" + request.params.path);
  };
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
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "../uploads");
    },
    filename: (req, file, callback) => {
      callback(null, `${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage });
  
  exports.uploadImage = upload.single("image");
  
  exports.createImage = (request, response, next) => {
    const file = request.file;
    console.log(file.filename);
    if (!file) {
      response.send("no file image");
    }
    response.send(file);
  };