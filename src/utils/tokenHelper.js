const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.SECRET, { expiresIn: "1w" });

const tokenValidator = function (token) {
  const verifyUser = jwt.verify(token, process.env.SECRET);
  return verifyUser;
};
module.exports = { generateToken, tokenValidator };