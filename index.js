const env = process.env.NODE_ENV || 'development';

if ('development' === env) {
  require('dotenv').config();
}

require('rootpath')();

const services = require('./lib/services');
const compress = require('koa-compress');
const logger = require('koa-logger');
const router = require('koa-router');
const load = require('./lib/load');
const koa = require('koa');

module.exports = api;

function api(opts) {
  opts = opts || {};
  const app = koa();

  if ('test' != env) app.use(logger());

  app.use(services(opts.services));
  app.use(compress());
  app.use(router(app));

  load(app, __dirname + '/api');
  return app;
}
