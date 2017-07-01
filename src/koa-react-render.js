'use strict';

import path from 'path';
import process from 'process';
import nunjucks from 'nunjucks';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const root = process.cwd();

export default (component, options = {}) => (ctx, next) => { // eslint-disable-line react/display-name
  nunjucks.configure(path.resolve(root, options.root || './views'));

  options[(options.renderKey || 'content')] = renderToStaticMarkup(
    React.cloneElement(component, {
      radiumConfig: {
        userAgent: ctx.request.headers['user-agent']
      }
    })
  );

  ctx.body = nunjucks.render(
    options.template || 'template.html',
    options
  );

  return next();
};
