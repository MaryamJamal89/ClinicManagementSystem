const express = require("express");
const router = express.Router()
const controller = require("./../Controllers/recep_controller")
isAuth=require("./../authMW");

router.get(isAuth, controller.getRecep);
router.post(isAuth, controller.createRecep);

module.exports = router;