const Joi = require('joi');

const userSchema = Joi.object().keys({
  id: Joi.string().guid().required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  projectId: Joi.string().guid().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

module.exports = (userData) => {
  const { error } = Joi.validate(userData, userSchema);
  if (error && Array.isArray(error.details) && error.details.length > 0) {
    return error.details[0];
  }
  return null;
};