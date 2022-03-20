"use strict";
const express = require("express");
const router = new express.Router();
const controller = require("./controller");
const { bearerAuth } = require("../../middleware");

router.use(bearerAuth);

router.get(
  "/user/:id",
  controller.userByIdController
);

router.get(
  "/all-users",
  controller.allUsersController
);

module.exports = router;