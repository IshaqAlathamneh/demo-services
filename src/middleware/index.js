const basicAuth = require("./basic-auth");
const bearerAuth = require("./bearer-auth");
const createUserBodyChecker = require('./bodychecker/user/createUserBodyChecker')
const createAndUpdateRefBodyChecker = require('./bodychecker/reflection/create-and-update')
const idParamsChecker = require('./bodychecker/reflection/id-params')
module.exports = {
  basicAuth,
  bearerAuth,
  createUserBodyChecker,
  createAndUpdateRefBodyChecker,
  idParamsChecker
};
