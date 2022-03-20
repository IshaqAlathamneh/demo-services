"use strict";
const express = require("express");
const router = new express.Router();
const controller = require("./controller");
const { basicAuth, bearerAuth, createUserBodyChecker } = require("../../middleware");

router.post("/login", basicAuth, controller.loginController);
router.post("/signup", createUserBodyChecker, controller.createUserController);
router.delete("/delete", bearerAuth, controller.deleteUserController);
// API to generate token
router.post("/generate-token", controller.generateTokenController);

module.exports = router;