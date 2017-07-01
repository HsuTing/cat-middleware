'use strict';

import path from 'path';
import process from 'process';

export default (options = {}) => {
  const rootPath = path.resolve(process.cwd(), options.root || './i18n');
  const i18n = options.i18n || 'en-us';

  return (ctx, next) => {
    ctx.i18n = require(path.resolve(rootPath, `${ctx.cookies.i18n || i18n}.json`));

    return next();
  }
};
