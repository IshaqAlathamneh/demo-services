const statue = require("http-status-codes");
const base64 = require('base-64');
const { isValidEmail, comparePassword } = require('../utils/authHelper');
const { getUserByEmail } = require("../services/userServices");
const { generateToken } = require("../utils/tokenHelper");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next("invalid login....");
  }
  const encodedHeader = req.headers.authorization.split(" ")[1];
  const decodedHeader = base64.decode(encodedHeader);
  const [email, password] = decodedHeader.split(":");
  if (!email || !password) next("Some values are missing");
  if (!isValidEmail(email)) next("Please enter a valid email address");
  try {
    const {rows} = await getUserByEmail(email);
    if (!rows) next("Invalid login....");

    const isMatch = comparePassword(password, rows[0].password);
    console.log(isMatch);
    if (!isMatch) next("Invalid login....");

    const token = generateToken(rows[0].id);
    req.token = token;

    next();
  } catch (error) {
    res
      .status(statue.StatusCodes.FORBIDDEN)
      .send({ message: "someThing went wrong", err: error });
  }
};
