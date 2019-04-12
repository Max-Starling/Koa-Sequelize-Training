const mount = require('koa-mount');
const v1 = require('./v1');
const v2 = require('./v2');

module.exports = (app) => {
    app.use(mount('/v1', v1));
    app.use(mount('/v2', v2));
};
