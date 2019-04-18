const Router = require('koa-router');
const versions = require('./versions');
// const init = require('./services/init.service');

const router = new Router();

// router.get('/', init);

const defineRoutes = (app) => {
  app.use(router.routes());
  versions(app);
};

module.exports = defineRoutes;
