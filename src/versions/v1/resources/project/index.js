const Router = require('koa-router');
const controller = require('./project.controller');

const router = new Router();

router.get('/', controller.getProjects);
router.post('/', controller.addProject);

module.exports = router.routes();
