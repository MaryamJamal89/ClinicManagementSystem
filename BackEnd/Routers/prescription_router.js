const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/prescription_controller")

//get all prescriptions 
router.get("", controller.getPrescription);

//get all prescriptions of a specific doctor
app.get('/:doctor_id', controller.getbyDoctor);

//create new prescription
router.post("", controller.postPrescription);

//delete prescription by id
app.delete('/:prescriptionId', controller.deletePrescription)

module.exports = router;