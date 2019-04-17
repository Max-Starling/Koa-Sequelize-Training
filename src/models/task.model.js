const Sequelize = require('sequelize');
const sequelize = require('../sequalize');
// const User = require('./user.model');

const Model = Sequelize.Model;

class Task extends Model {}

Task.init({
  // attributes
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  estimatedTime: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // counter: {
  //   type: Sequelize.NUMBER,
  //   allowNull: false,
  //   defaultValue: 0
  // }
  // userId: {
  //   type: Sequelize.STRING,
  //   references: {
  //     model: User,
  //     key: 'id'
  //   }
  // }
}, {
  sequelize,
  modelName: 'task'
});

// Task.User = Task.belongsTo(User);

module.exports = Task;