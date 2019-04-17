const uuid = require('uuid');
const sequelize = require('../../../../sequalize');
const User = require('../../../../models/user.model');
const Task = require("../../../../models/task.model");
const validateAdding = require('./validators/add.validator');

module.exports.getUserById = async (ctx) => {
    const { id } = ctx.params;
    const { tasks } = ctx.query;

    try {
      await sequelize.authenticate();

      const searchOptions = {};
      if (tasks) {
        searchOptions.include = [ Task ];
      }

      const user = await User.findByPk(id, searchOptions);
      if (!user) {
        ctx.body = `User with id ${id} wasn't found`;
        return;
      }
      ctx.body = user;
      return;
    } catch(e) {
        console.log("unexpected error occured: ", e);
    }
    ctx.body = 'Wrong body';
    return;
};

module.exports.getUsers = async (ctx) => {
    const { tasks } = ctx.query;

    try {
      await sequelize.authenticate();
      const searchOptions = {};
      if (tasks) {
        searchOptions.include = [Task];
      }
      const users = await User.findAll(searchOptions);
      ctx.body = users;
      return;
    } catch(e) {
        console.log("unexpected error occured: ", e);
    }
    ctx.body = 'Wrong body';
    return;
};

module.exports.addUser = async (ctx) => {
    if (ctx.request.body) {
        const { firstName, lastName, projectId } = ctx.request.body;

        try {
            await sequelize.authenticate();
            const userData = {
              firstName,
              lastName,
              projectId
            };
            const error = await validateAdding(userData);
            if (error && error.message) {
                ctx.body = error.message;
                return;
            }
            const user = await User.create({
                id: uuid(),
                ...userData
            });
            console.log(`User ${user.firstName} ${user.lastName} was created with id: ${user.id}`);
            ctx.body = `User ${user.firstName} ${user.lastName} was created with id: ${user.id}`;
            return;
        } catch(e) {
            console.log("unexpected error occured: ", e);
        }
    }

    ctx.body = 'Wrong body';
    return;
};
