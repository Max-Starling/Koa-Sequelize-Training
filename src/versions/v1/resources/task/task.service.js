const uuid = require('uuid');
const sequelize = require('../../../../sequelize');
const Project = require('../../../../models/project.model');
const Task = require('../../../../models/task.model');
const createError = require('../../../../services/error.service');
const validateAdding = require('./validators/add.validator');

module.exports.getTaskById = async (id) => {
  await sequelize.authenticate();
  const task = await Task.findByPk(id);
  if (!task) {
    return ({ error: createError(`Task with id "${id}" wasn't found`, 404) });
  }
  return ({ value: task });
};

module.exports.getTasks = async () => {
  await sequelize.authenticate();
  const tasks = await Task.findAll();
  return ({ value: tasks });
};

module.exports.addTask = async (taskData) => {
  await sequelize.authenticate();
  const error = validateAdding(taskData);
  if (error && error.message) {
    return ({ error: createError(error.message, 404) });
  }
  const task = await Task.create({
    ...taskData,
    id: uuid(),
  });
  console.log(`Task "${task.name}" was created with id: "${task.id}"`);
  return ({ value: task });
};

module.exports.deleteTask = async (taskId) => {
  await sequelize.authenticate();
  const task = await Task.findByPk(taskId);
  if (!task) {
    return ({ error: createError(`Task with id "${id}" wasn't found`, 404) });
  }
  const res = await task.destroy();
  console.log(`Task with id: "${taskId}" was deleted`);
  return ({ value: res });
};
