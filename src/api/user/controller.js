"use strict";
const statue = require("http-status-codes");
const {
  getAllUsers,
  getUserById,
} = require("../../services/userServices");

const userByIdController = async (req, res) => {
  try {
    const {rows} = await getUserById(req.params.id);
    res.status(statue.StatusCodes.OK).send(rows[0]);
  } catch (error) {
    res.status(statue.StatusCodes.BAD_REQUEST).send({ err: error.message });
  }
};

const allUsersController = async (req, res) => {
  try {
    const {rows} = await getAllUsers();
    res.status(statue.StatusCodes.OK).send(rows);
  } catch (error) {
    res.status(statue.StatusCodes.BAD_REQUEST).send({ err: error.message });
  }
};

module.exports = {
  allUsersController,
  userByIdController,
};
