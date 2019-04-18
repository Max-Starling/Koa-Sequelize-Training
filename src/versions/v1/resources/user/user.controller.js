const userService = require('./user.service');

module.exports.getUserById = async (ctx) => {
  const { id } = ctx.params;
  const { tasks } = ctx.query;

  try {
    const searchOptions = { tasks };
    const { error, value } = await userService.getUserById(id, searchOptions);

    if (error) {
      ctx.status = error.status;
      ctx.body = { ...error };
    } else if (value) {
      ctx.status = 200;
      ctx.body = value;
    }
  } catch(error) {
    ctx.status = 500;
    console.log("user controller error", error.name, error.message);
    ctx.body = error.message;
  }
};

module.exports.getUsers = async (ctx) => {
  const { tasks } = ctx.query;

  try {
    const searchOptions = { tasks };
    const { error, value } = await userService.getUsers(searchOptions);

    if (error) {
      ctx.status = error.status;
      ctx.body = { ...error };
    } else if (value) {
      ctx.status = 200;
      ctx.body = value;
    }
  } catch(error) {
    ctx.status = 500;
    console.log("user controller error", error.name, error.message);
    ctx.body = error.message;
  }
};

module.exports.addUser = async (ctx) => {
  const { firstName, lastName, projectId } = ctx.request.body;

  try {
    const userData = {
      firstName,
      lastName,
      projectId
    };
    const { error, value } = await userService.addUser(userData);

    if (error) {
      ctx.status = error.status;
      ctx.body = error;
    } else if (value) {
      ctx.status = 201;
      ctx.body = value;
    }
  } catch(error) {
    ctx.status = 500;
    console.log("user controller error", error.name, error.message);
    ctx.body = error.message;
  }
};

module.exports.deleteUser = async (ctx) => {
  const { id } = ctx.params;

  try {
    const { error, value } = await userService.deleteUser(id);

    if (error) {
      ctx.status = error.status;
      ctx.body = error;
    } else if (value) {
      ctx.status = 200;
      ctx.body = value;
    }
  } catch(error) {
    ctx.status = 500;
    console.log("user controller error", error.name, error.message);
    ctx.body = error.message;
  }
};
