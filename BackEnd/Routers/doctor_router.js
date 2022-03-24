const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/doctor_controller")
isAuth=require("./../authMW");

router.get("", controller.getDoctors);
router.get("/:id", controller.getDoctorsByID);
router.post("", controller.createDoctor);

module.exports = router;