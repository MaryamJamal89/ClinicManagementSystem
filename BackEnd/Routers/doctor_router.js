const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/doctor_controller")
isAuth=require("./../authMW");

router.get(isAuth, controller.getDoctors);
router.post(isAuth, controller.createDoctor);

module.exports = router;