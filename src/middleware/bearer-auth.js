const statue = require("http-status-codes");
const { getUserById } = require("../services/userServices");
const { tokenValidator } = require("../utils");

module.exports = async (req, res, next) => {
  try {
    !req.headers.authorization && next("invalid login....");
    const token = req.headers.authorization.split(" ")[1];
    const parsedToken = tokenValidator(token);
    console.log(parsedToken);
    const {rows} = await getUserById(parsedToken.id)
    if(!rows) next('User Not Found')
    req.user = rows[0];
    next();
  } catch (error) {
    res
      .status(statue.StatusCodes.FORBIDDEN)
      .send({ message: "someThing went wrong", err: error });
  }
};
