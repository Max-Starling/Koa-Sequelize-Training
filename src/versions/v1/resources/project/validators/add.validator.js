const Joi = require('joi');

const schema = Joi.object().keys({
  // id: Joi.string().guid().required(),
  name: Joi.string().min(3).max(30).required(),
});

module.exports = (projectData) => {
  const { error } = Joi.validate(projectData, schema);
  if (error && Array.isArray(error.details) && error.details.length > 0) {
    return error.details[0];
    // console.log(error.details);
    // const { key } = error.details[0].context;
    // switch(type) {

    // }
    // console.log(message, type);
    // console.log(error.details[0].message, error.details[0].type);
  }
  return null;
};
