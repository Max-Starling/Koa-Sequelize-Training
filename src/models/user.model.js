const Sequelize = require('sequelize');
const sequelize = require('../sequalize');

const Model = Sequelize.Model;

class User extends Model {}

User.init({
  // attributes
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }
  }, {
    sequelize,
    modelName: 'user'
});

module.exports = User;