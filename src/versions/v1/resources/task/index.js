const Router = require('koa-router');
const controller = require('./task.controller');

const router = new Router();

router.get('/', controller.getTasks);
router.post('/', controller.addTask);

module.exports = router.routes();
