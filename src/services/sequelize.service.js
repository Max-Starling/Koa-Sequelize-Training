const sequelize = require('../sequalize');
const Project = require('../models/project.model');
const User = require('../models/user.model');
const Task = require('../models/task.model');

module.exports.init = async () => {
  sequelize.authenticate()
    .then(async () => {
      console.log('Connection has been established successfully.');

      await Project.sync({ force: true });
      await User.sync({ force: true });
      await Task.sync({ force: true });
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
};
