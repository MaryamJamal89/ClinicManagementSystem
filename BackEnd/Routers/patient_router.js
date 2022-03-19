const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/patient_controller")

router.get("", controller.getPatients);
router.post("", controller.createPatient);

module.exports = router;