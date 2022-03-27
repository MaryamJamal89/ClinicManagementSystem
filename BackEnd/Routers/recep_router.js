const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/recep_controller")
isAuth=require("./../authMW");

router.get("", controller.getRecep);
router.get("/:id", controller.getRecepByID);
router.post("", controller.createRecep);

module.exports = router;