const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/appointment_controller")

//get all appointments of a certain doctor in a specific date
//app.get('/:app_date/doctor/:doctor_id', controller.getappointsID)
    //get all appointments 
router.get("", controller.getappoints);

router.post("", controller.createappoints);

// app.delete('/:appointmentId', controller.deleteappoints)
module.exports = router;