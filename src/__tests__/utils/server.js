// @flow
'use strict';

import Koa from 'koa';
import koaRouter from 'koa-better-router';

export default (
  port: number,
  routerFunc: Function,
  appFunc: Function = () => {}
) => {
  const app = new Koa();
  const router = koaRouter().loadMethods();

  appFunc(app);
  routerFunc(router);

  app.use(router.middleware());

  return app.listen(port);
};
