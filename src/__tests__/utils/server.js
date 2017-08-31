'use strict';

import Koa from 'koa';
import Router from 'koa-better-router';

export default (
  routerFunc,
  appFunc = () => {}
) => {
  const app = new Koa();
  const router = Router().loadMethods();

  appFunc(app);
  routerFunc(router);

  app.use(router.middleware());

  return app.listen(8000);
};
