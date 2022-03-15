"use strict";
const statue = require("http-status-codes");
const { createUser } = require("../../services/authService");
const {deleteUserById} = require('../../services/userServices')

const loginController = async (req, res) => {
  try {
    res.status(statue.StatusCodes.OK).send({ token: req.token });
  } catch (error) {
    res.status(statue.StatusCodes.UNAUTHORIZED).send({ err: error.message });
  }
};

const createUserController = async (req, res) => {
  try {
    const result = await createUser(req.body);
    res.status(statue.StatusCodes.CREATED).send(result);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
    res.status(statue.StatusCodes.BAD_REQUEST).send({ 'message': 'User with that EMAIL already exist' })
    }
    res.status(statue.StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteUserController = async (req, res) => {
  try {
    const {rows} = await deleteUserById(req.user.id);
    if(!rows[0]) {
      return res.status(statue.StatusCodes.NOT_FOUND).send({'message': 'user not found'});
    }
    res.status(statue.StatusCodes.ACCEPTED).send({deleted: rows[0]})
  } catch (error) {
    res.status(statue.StatusCodes.BAD_REQUEST).send(error);
  }
}


module.exports = {
  loginController,
  createUserController,
  deleteUserController
};
