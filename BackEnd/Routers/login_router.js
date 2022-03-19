const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/login_controller")

//router.get("", controller.getPatients);
router.post("", controller.Login);

module.exports = router;