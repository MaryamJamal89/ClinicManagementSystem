const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/clinic_controller")

router.get("/all", controller.getClinic);
router.get("/service/:id", controller.getServiceName);

router.post("", controller.createClinic);

module.exports = router;