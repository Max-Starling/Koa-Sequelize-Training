const sequelizeConfig = require('./sequelize.js');

const port = parseInt(process.env.PORT, 10) || 3000;

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    apiUrl: `http://localhost:${port}`,
    port,
    sequelizeConfig: sequelizeConfig.development
  }
};

module.exports = config[env];

