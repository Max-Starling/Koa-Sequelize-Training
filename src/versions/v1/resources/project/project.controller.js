const projectService = require('./project.service');

module.exports.getProjectById = async (ctx) => {
  const { id } = ctx.params;
  const { users, userIds, tasks } = ctx.query;

  try {
    const searchOptions = { users, userIds, tasks };
    const { error, value } = await projectService.getProjectById(id, searchOptions);

    if (error) {
      ctx.status = error.status;
      ctx.body = { ...error };
    } else if (value) {
      ctx.status = 200;
      ctx.body = value;
    }
  } catch(error) {
    ctx.status = 500;
    console.log("project controller error", error.name, error.message);
    ctx.body = error.message;
  }
};

module.exports.getProjects = async (ctx) => {
  const { users, userIds, tasks } = ctx.query;

  try {
    const searchOptions = { users, userIds, tasks };
    const { error, value } = await projectService.getProjects(searchOptions);

    if (error) {
      ctx.status = error.status;
      ctx.body = { ...error };
    } else if (value) {
      ctx.status = 200;
      ctx.body = value;
    }
  } catch(error) {
    ctx.status = 500;
    console.log("project controller error", error.name, error.message);
    ctx.body = error.message;
  }
};

module.exports.addProject = async (ctx) => {
  const { name } = ctx.request.body;

  try {
    const projectData = { name };
    const { error, value } = await projectService.addProject(projectData);

    if (error) {
      ctx.status = error.status;
      ctx.body = error;
    } else if (value) {
      ctx.status = 201;
      ctx.body = value;
    }
  } catch(error) {
    ctx.status = 500;
    console.log("project controller error", error.name, error.message);
    ctx.body = error.message;
  }
};

module.exports.deleteProject = async (ctx) => {
  const { id } = ctx.params;

  try {
    const { error, value } = await projectService.deleteProject(id);

    if (error) {
      ctx.status = error.status;
      ctx.body = error;
    } else if (value) {
      ctx.status = 200;
      ctx.body = value;
    }
  } catch(error) {
    ctx.status = 500;
    console.log("project controller error", error.name, error.message);
    ctx.body = error.message;
  }
};