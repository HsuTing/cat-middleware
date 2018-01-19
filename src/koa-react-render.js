// @flow
'use strict';

import path from 'path';
import nunjucks from 'nunjucks';
import * as React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

import type {middlewareType} from 'types/middleware';

const root: string = process.cwd();

export default (
  component: React.DOM,
  options: {
    root?: string,
    renderKey?: string,
    template?: string,
    content?: string
  } = {}
): middlewareType => (ctx, next) => { // eslint-disable-line react/display-name
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
