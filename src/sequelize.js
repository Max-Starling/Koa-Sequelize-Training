const Sequelize = require('sequelize');
const sequelizeConfig = require('./config/sequelize.js')

const env = process.env.NODE_ENV || 'development';

const { database, username, password, ...config } = sequelizeConfig[env];

const sequelize = new Sequelize(
  database,
  username,
  password,
  config,
);

module.exports = sequelize;
