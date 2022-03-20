const uuid = require('uuidv4');
const moment = require('moment');
const { generateToken } = require("../utils/tokenHelper");
const bcrypt = require("bcryptjs");
const {createUserQuery} = require('../models/user');
const {pool: db} = require('../models/index')

const createUser = async (userData) => {
  userData.password = await bcrypt.hash(userData.password, 8);
  const values = [uuid.uuid(), userData.email, userData.password, moment(new Date()), moment(new Date())];
  const {rows} = await db.query(createUserQuery, values);
  if(!rows) return null;
  const token = generateToken(rows[0].id);
  return {user: rows[0], token};
};


module.exports = {  createUser };
