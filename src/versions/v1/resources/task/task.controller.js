const taskService = require('./task.service');

module.exports.getTaskById = async (ctx) => {
  const { id } = ctx.params;

  try {
    const { error, value } = await taskService.getTaskById(id);

    if (error) {
      ctx.status = error.status;
      ctx.body = { ...error };
  } else if (value) {
      ctx.status = 200;
      ctx.body = value;
    }
  } catch(error) {
    ctx.status = 500;
    console.log("task controller error", error.name, error.message);
    ctx.body = error.message;
  }
};

module.exports.getTasks = async (ctx) => {
  try {
    const { error, value } = await taskService.getTasks();

    if (error) {
      ctx.status = error.status;
      ctx.body = { ...error };
    } else if (value) {
      ctx.status = 200;
      ctx.body = value;
    }
  } catch(error) {
    ctx.status = 500;
    console.log("task controller error", error.name, error.message);
    ctx.body = error.message;
  }
};

module.exports.addTask = async (ctx) => {
  const { title, description, estimatedTime, userId } = ctx.request.body;

  try {
    const taskData = {
      title,
      description,
      estimatedTime,
      userId
    };
    const { error, value } = await taskService.addTask(taskData);

    if (error) {
      ctx.status = error.status;
      ctx.body = error;
    } else if (value) {
      ctx.status = 201;
      ctx.body = value;
    }
  } catch(error) {
    ctx.status = 500;
    console.log("task controller error", error.name, error.message);
    ctx.body = error.message;
  }
};

module.exports.deleteProject = async (ctx) => {
  const { id } = ctx.params;

  try {
    const { error, value } = await taskService.deleteTask(id);

    if (error) {
      ctx.status = error.status;
      ctx.body = error;
    } else if (value) {
      ctx.status = 200;
      ctx.body = value;
    }
  } catch(error) {
    ctx.status = 500;
    console.log("task controller error", error.name, error.message);
    ctx.body = error.message;
  }
};
