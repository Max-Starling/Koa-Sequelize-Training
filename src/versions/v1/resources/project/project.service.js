const uuid = require('uuid');
const sequelize = require('../../../../sequelize');
const Project = require('../../../../models/project.model');
const User = require('../../../../models/user.model');
const Task = require('../../../../models/task.model');
const createError = require('../../../../services/error.service');
const validateAdding = require('./validators/add.validator');

const getSequalizeSearchOptions = ({ users, userIds, tasks }) => {
  const searchOptions = {};
  if (users && tasks) {
    searchOptions.include = [{ model: User, include: Task }];
  } else if (users) {
    searchOptions.include = [ User ];
  } else if (userIds) {
    // [[sequelize.fn('GROUP_CONCAT',sequelize.col('id')), 'id']];
    searchOptions.include = [ { model: User, attributes: ['id'] } ];
  }
  return searchOptions;
};

module.exports.getProjectById = async (id, searchOptions) => {
  await sequelize.authenticate();
  const sequelizeSearchOptions = getSequalizeSearchOptions(searchOptions);
  const project = await Project.findByPk(id, sequelizeSearchOptions);
  if (!project) {
    return ({ error: createError(`Project with id "${id}" wasn't found`, 404) });
  }
  return ({ value: project });
};

module.exports.getProjects = async (searchOptions) => {
  await sequelize.authenticate();
  const sequelizeSearchOptions = getSequalizeSearchOptions(searchOptions);
  const projects = await Project.findAll(sequelizeSearchOptions);
  return ({ value: projects });
};

module.exports.addProject = async (projectData) => {
  await sequelize.authenticate();
  const error = validateAdding(projectData);
  if (error && error.message) {
    return ({ error: createError(error.message, 404) });
  }
  const project = await Project.create({
    ...projectData,
    id: uuid(),
  });
  console.log(`Project "${project.name}" was created with id: "${project.id}"`);
  return ({ value: project });
};

module.exports.deleteProject = async (projectId) => {
  await sequelize.authenticate();
  const project = await Project.findByPk(projectId);
  if (!project) {
    return ({ error: createError(`Project with id "${id}" wasn't found`, 204) });
  }
  const res = await project.destroy();
  console.log(`Project with id: "${projectId}" was deleted`);
  return ({ value: res });
};
