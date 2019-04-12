const mount = require('koa-mount');
const v1 = require('./v1');
// const v2 = require('./v2');

const mountVersion = (app, versionRoute, versionResources) => {
    Object.keys(versionResources).forEach((key) => {
        app.use(mount(`${versionRoute}${key}`, versionResources[key]));
    });
};

module.exports = (app) => {
    mountVersion(app, '/v1', v1);
    // mountVersion(app, '/v2', v2);
};
