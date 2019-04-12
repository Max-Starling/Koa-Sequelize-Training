const uuid = require('uuid');
const sequelize = require('../../sequalize');
const User = require('../../models/user.model');

const version = 'v2';

module.exports.getUsers = async (ctx) => {
    try {
      await sequelize.authenticate();
      const users = await User.findAll();
      ctx.body = { apiVersion: version, users };
      return;
    } catch(e) {
        console.log("unexpected error occured: ", e);
    }
    ctx.body = 'Wrong body';
    return;
};

module.exports.addUser = async (ctx) => {
    if (ctx.request.body) {
        const { firstName, lastName } = ctx.request.body;

        try {
            await sequelize.authenticate();
            const user = await User.create({ id: uuid(), firstName, lastName });
            console.log(`User ${user.firstName} ${user.lastName} was created with id: ${user.id}`);
            return;
        } catch(e) {
            console.log("unexpected error occured: ", e);
        }
    }

    ctx.body = 'Wrong body';
    return;
};