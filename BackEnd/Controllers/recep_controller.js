////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////
const Recep = require("./../Models/receptionist");
const multer = require("multer");

////////////////////////////////////////GET///////////////////////////////////////////////////////////
exports.getRecep = function(request, response, next) {
    Recep.find({})
        .populate({ path: "clinic", strictPopulate: false })
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));

}
exports.getRecepByID = function(request, response, next) {
    Recep.findOne({_id:request.params.id})
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));
}
exports.getImage = function (request, response, next) {
    response.download("../uploads" + request.params.path);
  };
  
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
  