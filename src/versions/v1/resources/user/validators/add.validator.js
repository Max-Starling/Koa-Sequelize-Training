const Joi = require('joi');
const Project = require('../../../../../models/project.model');

const schema = Joi.object().keys({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  projectId: Joi.string().guid().required(),
});

const createError = message => ({ message });

module.exports = async (userData) => {
  const { error } = Joi.validate(userData, schema);
  if (error && Array.isArray(error.details) && error.details.length > 0) {
    console.log(error.details[0]);
    return error.details[0];
  } else {
    if (!await Project.findByPk(userData.projectId)) {
      console.log(`Project with id ${userData.projectId} not found`);
      return createError(`Project with id ${userData.projectId} not found`);
    }
  }
  return null;
};
