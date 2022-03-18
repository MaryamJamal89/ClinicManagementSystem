const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/doctor_controller")

router.get("", controller.getDoctors);
router.post("", controller.createDoctor);

module.exports = router;