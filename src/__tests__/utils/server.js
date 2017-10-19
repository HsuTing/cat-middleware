'use strict';

import Koa from 'koa';
import koaRouter from 'koa-better-router';

export default (
  port,
  routerFunc,
  appFunc = () => {}
) => {
  const app = new Koa();
  const router = koaRouter().loadMethods();

  appFunc(app);
  routerFunc(router);

  app.use(router.middleware());

  return app.listen(port);
};
