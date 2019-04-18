const sequelizeService = require('./sequelize.service');

module.exports = async (ctx) => {
  sequelizeService.init();
  ctx.body = 'init';
};
