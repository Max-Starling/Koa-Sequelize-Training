const uuid = require('uuid');
const sequelize = require('../../../../sequalize');
const Project = require('../../../../models/project.model');
const User = require('../../../../models/user.model');
const Task = require('../../../../models/task.model');
const validateAdding = require('./validators/add.validator');

const getSearchOptions = ({ users, userIds, tasks }) => {
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

module.exports.getProjectById = async (ctx) => {
  const { id } = ctx.params;
  const { users, userIds, tasks } = ctx.query;

  try {
    await sequelize.authenticate();

    const searchOptions = getSearchOptions({ users, tasks, userIds });

    const project = await Project.findByPk(id, searchOptions);
    if (!project) {
      ctx.body = `Project with id ${id} wasn't found`;
      return;
    }
    ctx.body = project;
    return;
  } catch(e) {
      console.log("unexpected error occured: ", e);
  }
  ctx.body = 'Wrong body';
  return;
};

module.exports.getProjects = async (ctx) => {
  const { users, userIds, tasks } = ctx.query;

  try {
    await sequelize.authenticate();
    
    const searchOptions = getSearchOptions({ users, tasks, userIds });

    const projects = await Project.findAll(searchOptions);
    ctx.body = projects;
    return;
  } catch(e) {
      console.log("unexpected error occured: ", e);
  }
  ctx.body = 'Wrong body';
  return;
};

module.exports.addProject = async (ctx) => {
  if (ctx.request.body) {
    const { name } = ctx.request.body;

    try {
      await sequelize.authenticate();
      const projectData = { name };
      const error = validateAdding(projectData);
      if (error && error.message) {
        console.log(error.message);
        ctx.body = error.message
        return;
      }
      const project = await Project.create({
        ...projectData,
        id: uuid(),
      });
      console.log(`Project ${project.name} was created with id: ${project.id}`);
      ctx.body = `Project ${project.name} was created with id: ${project.id}`;
      return;
    } catch(e) {
      console.log(e.message);
      ctx.body = e.message;
      return;
    }
  }

  ctx.body = 'Wrong body';
  return;
};
