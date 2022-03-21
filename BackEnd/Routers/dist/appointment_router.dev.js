"use strict";

var express = require("express");

var router = express.Router();

var _require = require("express-validator"),
    body = _require.body,
    param = _require.param,
    query = _require.query;

var controller = require("./../Controllers/appointment_controller"); //get all appointments of a certain doctor in a specific date
//router.get('/:app_date/doctor/:doctor_id', controller.getappointsID);
//get all appointments 


router.get("", controller.getAppoints);
router.post("", controller.createAppoints);
router.put("/update", controller.updAteappoints); //router.delete('/:appointmentId', controller.deleteappoints)
//router.delete("/:id", controller.deleteAppoints);

module.exports = router;