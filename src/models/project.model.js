const Sequelize = require('sequelize');
const sequelize = require('../sequalize');
const User = require('./user.model');

const Model = Sequelize.Model;

class Project extends Model {}

Project.init({
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // counter: {
  //   type: Sequelize.NUMBER,
  //   allowNull: false,
  //   defaultValue: 0
  // }
}, {
  sequelize,
  modelName: 'project'
});

Project.hasMany(User, { foreignKey: 'projectId', constraints: false });

module.exports = Project;