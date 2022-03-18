const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/clinic_controller")

router.get("", controller.getClinic);
router.post("", controller.createClinic);

module.exports = router;