const sequelize = require('../sequalize');
const User = require('../models/user.model');
const uuid = require('uuid');

module.exports.init = async () => {
  // await User.sync({ force: true });
  // await User.create({ id: uuid(), firstName: "Jane", lastName: "Doe" });

  sequelize.authenticate()
    .then(async () => {
      console.log('Connection has been established successfully.');

      await User.sync({ force: false });

      const users = await User.findAll();
      console.log("All users:", JSON.stringify(users, null, 4));
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  }