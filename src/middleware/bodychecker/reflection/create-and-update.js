const { celebrate, Joi, Segments } = require("celebrate");

module.exports = celebrate({
  [Segments.BODY]: Joi.object().keys({
    success: Joi.string().trim(),
    low_point: Joi.string().trim(),
    take_away: Joi.string().trim(),
  }),
});