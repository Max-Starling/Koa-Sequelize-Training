const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'starling',
  'root',
  'fafafa', {
    host: 'localhost',
    dialect: 'mysql'
  },
);

module.exports = sequelize;
