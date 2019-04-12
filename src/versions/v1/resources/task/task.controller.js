const uuid = require('uuid');
const sequelize = require('../../../../sequalize');
const Task = require('../../../../models/task.model');
const User = require('../../../../models/user.model');

module.exports.getTaskById = async (ctx) => {
    const { id } = ctx.params;

    try {
      await sequelize.authenticate();

      const task = await Task.findByPk(id);
      if (!task) {
        ctx.body = `Task with id ${id} wasn't found`;
        return;
      }
      ctx.body = task;
      return;
    } catch(e) {
        console.log("unexpected error occured: ", e);
    }
    ctx.body = 'Wrong body';
    return;
};

module.exports.getTasks = async (ctx) => {
    try {
      await sequelize.authenticate();
      const tasks = await Task.findAll();
      ctx.body = tasks;
      return;
    } catch(e) {
        console.log("unexpected error occured: ", e);
    }
    ctx.body = 'Wrong body';
    return;
};

module.exports.addTask = async (ctx) => {
    if (ctx.request.body) {
        const { title, description, estimatedTime, userId } = ctx.request.body;

        if (!await User.findByPk(userId)) {
            console.log(`User with id ${userId} not found`);
            return;
        }

        try {
            await sequelize.authenticate();
            const task = await Task.create({
                id: uuid(),
                title,
                description,
                estimatedTime,
                userId,
            });
            console.log(`Task ${task.title} was created with id: ${task.id}`);
            ctx.body = `Task ${task.title} was created with id: ${task.id}`;
            return;
        } catch(e) {
            console.log("unexpected error occured: ", e);
        }
    }

    ctx.body = 'Wrong body';
    return;
};
