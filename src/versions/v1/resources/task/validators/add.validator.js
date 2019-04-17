const Joi = require('joi');
const User = require('../../../../../models/user.model');

const schema = Joi.object().keys({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().max(200).optional().allow(""),
  estimatedTime: Joi.string().max(20).optional(),
  userId: Joi.string().guid().required(),
});

const createError = message => ({ message });

module.exports = async (taskData) => {
  const { error } = Joi.validate(taskData, schema);
  if (error && Array.isArray(error.details) && error.details.length > 0) {
    console.log(error.details[0]);
    return error.details[0];
  } else {
    if (!await User.findByPk(taskData.userId)) {
      console.log(`User with id ${taskData.userId} not found`);
      return createError(`User with id ${taskData.userId} not found`);
    }
  }
  return null;
};
