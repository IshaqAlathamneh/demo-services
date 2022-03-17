const {pool: db} = require('../models/index')
const {findUserByEmailQuery, findAllUsersQuery, findUserByIdQuery, deleteUserQuery} = require('../models/user')

const getUserById = async (id) => await db.query(findUserByIdQuery, [id]);
const deleteUserById = async (id) => await db.query(deleteUserQuery, [id]);
const getUserByEmail = async (email) => await db.query(findUserByEmailQuery, [email]);
const getAllUsers = async () => await db.query(findAllUsersQuery);


module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUserById
};