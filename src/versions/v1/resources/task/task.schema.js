const Joi = require('joi');

const taskSchema = Joi.object().keys({
  id: Joi.string().guid().required(),
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().max(200).optional().allow(""),
  estimatedTime: Joi.string().max(20).optional(),
  userId: Joi.string().guid().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

module.exports = (taskData) => {
  const { error } = Joi.validate(taskData, taskSchema);
  if (error && Array.isArray(error.details) && error.details.length > 0) {
    return error.details[0];
  }
  return null;
};