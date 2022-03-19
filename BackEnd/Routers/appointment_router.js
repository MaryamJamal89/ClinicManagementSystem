const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/appointment_controller")

router.get("", controller.getappoints);
router.post("", controller.createappoints);

module.exports = router;