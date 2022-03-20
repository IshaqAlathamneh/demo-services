"use strict";
const express = require("express");
const router = new express.Router();
const controller = require("./controller");
const { bearerAuth, idParamsChecker, createAndUpdateRefBodyChecker } = require("../../middleware");

router.post("/create", bearerAuth, createAndUpdateRefBodyChecker, controller.createReflectionController);
router.get("/getOne/:id", idParamsChecker, bearerAuth, controller.findOneReflectionController);
router.get("/getAll", bearerAuth,controller.findAllReflectionsController);
router.put("/update/:id", idParamsChecker, bearerAuth, createAndUpdateRefBodyChecker, controller.updateReflectionController);
router.delete("/delete/:id", idParamsChecker, bearerAuth,controller.deleteReflectionController);

module.exports = router;