'use strict';

const Koa = require('koa');
const Router = require('koa-better-router');

module.exports = (routerFunc = () => {}, appFunc = () => {}) => {
  const app = new Koa();
  const router = Router().loadMethods();

  appFunc(app);
  routerFunc(router);

  app.use(router.middleware());

  return app.listen(8000);
};
