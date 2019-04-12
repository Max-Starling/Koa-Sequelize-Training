const uuid = require('uuid');
const sequelize = require('../../../../sequalize');
const Project = require('../../../../models/project.model');
const User = require('../../../../models/user.model');
const Task = require('../../../../models/task.model');

module.exports.getProjectById = async (ctx) => {
    const { id } = ctx.params;
    const { users, tasks } = ctx.query;

    try {
      await sequelize.authenticate();

      const searchOptions = {};
      if (users && tasks) {
        searchOptions.include = [{ model: User, include: Task }];
      } else if (users) {
        searchOptions.include = [ User ];
      }

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
    const { users, tasks } = ctx.query;

    try {
      await sequelize.authenticate();
      const searchOptions = {};
      if (users && tasks) {
        searchOptions.include = [{ model: User, include: Task }];
      } else if (users) {
        searchOptions.include = [ User ];
      }
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
            const project = await Project.create({
                id: uuid(),
                name,
            });
            console.log(`Project ${project.name} was created with id: ${project.id}`);
            ctx.body = `Project ${project.name} was created with id: ${project.id}`;
            return;
        } catch(e) {
            console.log("unexpected error occured: ", e);
        }
    }

    ctx.body = 'Wrong body';
    return;
};
