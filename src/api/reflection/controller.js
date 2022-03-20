"use strict";
const statue = require("http-status-codes");
const { createReflection, updateReflection, getAllReflections, getReflectionById, deleteReflectionById } = require("../../services/refliction");

const findOneReflectionController = async (req, res) => {
  const {id} = req.params;
  try {
    const result = await getReflectionById(id, req.user.id);
    res.status(statue.StatusCodes.OK).send(result.rows[0]);
  } catch (error) {
    res.status(statue.StatusCodes.UNAUTHORIZED).send({ err: error.message });
  }
};
const findAllReflectionsController = async (req, res) => {
  try {
    const {rows} = await getAllReflections(req.user.id);
    res.status(statue.StatusCodes.OK).send(rows);
  } catch (error) {
    res.status(statue.StatusCodes.UNAUTHORIZED).send({ err: error.message });
  }
};

const createReflectionController = async (req, res) => {
  try {
    const result = await createReflection(req.body, req.user.id);
    res.status(statue.StatusCodes.CREATED).send(result);
  } catch (error) {
    res.status(statue.StatusCodes.BAD_REQUEST).send(error);
  }
};

const updateReflectionController = async (req, res) => {
  try {
    const result = await updateReflection(req.body, req.params.id, req.user.id);
    res.status(statue.StatusCodes.CREATED).send(result);
  } catch (error) {
    res.status(statue.StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteReflectionController = async (req, res) => {
  try {
    const {rows} = await deleteReflectionById(req.params.id, req.user.id);
    if(!rows[0]) {
      res.status(statue.StatusCodes.NOT_FOUND).send({'message': 'reflection not found'});
    }
    res.status(statue.StatusCodes.ACCEPTED).send({deleted: rows[0]})
  } catch (error) {
    res.status(statue.StatusCodes.BAD_REQUEST).send(error);
  }
}


module.exports = {
  deleteReflectionController,
  updateReflectionController,
  createReflectionController,
  findAllReflectionsController,
  findOneReflectionController
};
