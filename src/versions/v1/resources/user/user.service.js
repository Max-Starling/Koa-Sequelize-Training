const uuid = require('uuid');
const sequelize = require('../../../../sequelize');
const User = require('../../../../models/user.model');
const Task = require('../../../../models/task.model');
const createError = require('../../../../services/error.service');
const validateAdding = require('./validators/add.validator');

const getSequalizeSearchOptions = ({ tasks, taskIds }) => {
  const searchOptions = {};
  if (tasks) {
    searchOptions.include = [ Task ];
  } else if (taskIds) {
    searchOptions.include = [ { model: Task, attributes: ['id'] } ];
  }
  return searchOptions;
};

module.exports.getUserById = async (id, searchOptions) => {
  await sequelize.authenticate();
  const sequelizeSearchOptions = getSequalizeSearchOptions(searchOptions);
  const user = await User.findByPk(id, sequelizeSearchOptions);
  if (!user) {
    return ({ error: createError(`User with id "${id}" wasn't found`, 404) });
  }
  return ({ value: user });
};

module.exports.getUsers = async (searchOptions) => {
  await sequelize.authenticate();
  const sequelizeSearchOptions = getSequalizeSearchOptions(searchOptions);
  const tasks = await User.findAll(sequelizeSearchOptions);
  return ({ value: tasks });
};

module.exports.addUser = async (userData) => {
  await sequelize.authenticate();
  const error = validateAdding(userData);
  if (error && error.message) {
    return ({ error: createError(error.message, 404) });
  }
  const user = await User.create({
    ...userData,
    id: uuid(),
  });
  console.log(`User "${user.name}" was created with id: "${user.id}"`);
  return ({ value: user });
};

module.exports.deleteUser = async (userId) => {
  await sequelize.authenticate();
  const user = await User.findByPk(userId);
  if (!user) {
    return ({ error: createError(`User with id "${id}" wasn't found`, 204) });
  }
  const res = await user.destroy();
  console.log(`User with id: "${userId}" was deleted`);
  return ({ value: res });
};
