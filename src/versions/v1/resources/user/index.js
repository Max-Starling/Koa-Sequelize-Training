const Router = require('koa-router');
const controller = require('./user.controller');

const router = new Router();

router.get('/', controller.getUsers);
router.post('/', controller.addUser);

module.exports = router.routes();
