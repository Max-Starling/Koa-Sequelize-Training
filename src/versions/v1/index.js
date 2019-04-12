const Router = require('koa-router');
const router = new Router();
const controller = require('./controller');

console.log(controller.getUsers);

router.get('/', controller.getUsers);
router.post('/', controller.addUser);

module.exports = router.routes();
