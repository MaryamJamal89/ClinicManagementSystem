const express = require("express");
const router = express.Router()
const { body, param, query } = require("express-validator")
const controller = require("./../Controllers/appointment_controller")

//get all appointments of a certain doctor in a specific date
//router.get('/:app_date/doctor/:doctor_id', controller.getappointsID);
//get all appointments 
router.get("", controller.getAppoints);

router.post("", controller.createAppoints);

router.put("/update", controller.updAteappoints);

//router.delete('/:appointmentId', controller.deleteappoints)
router.delete("/:id", controller.deleteAppoints);

module.exports = router;