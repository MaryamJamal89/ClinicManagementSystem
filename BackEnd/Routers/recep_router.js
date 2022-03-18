const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/recep_controller")

router.get("", controller.getRecep);
router.post("", controller.createRecep);

module.exports = router;