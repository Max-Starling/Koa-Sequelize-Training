const Router = require('koa-router');
const router = new Router();
const controller = require('./controller');

router.get('/', controller.getUsers);
router.post('/', controller.addUser);

module.exports = router.routes();
