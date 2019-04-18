const Joi = require('joi');

const projectSchema = Joi.object().keys({
  id: Joi.string().guid().required(),
  name: Joi.string().min(3).max(30).required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

module.exports = (projectData) => {
  const { error } = Joi.validate(projectData, projectSchema);
  if (error && Array.isArray(error.details) && error.details.length > 0) {
    return error.details[0];
  }
  return null;
};