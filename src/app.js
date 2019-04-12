const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const defineRoutes = require('./defineRoutes');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = new Koa();

app.on('error', (err, ctx) => {
  console.error('server error', err);
});

app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));

defineRoutes(app);

app.listen(config.port, () => {
  console.warn(`Api server listening on ${config.port}, in ${process.env.NODE_ENV} mode`);
});

module.exports = app;

