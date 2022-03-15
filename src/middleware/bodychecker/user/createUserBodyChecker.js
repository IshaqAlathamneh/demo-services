const { celebrate, Joi, Segments } = require("celebrate");

module.exports = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email().trim(),
    password: Joi.string().required(),
  }),
});