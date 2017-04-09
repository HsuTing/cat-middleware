'use strict';

import path from 'path';
import process from 'process';
import nunjucks from 'nunjucks';
import {renderToStaticMarkup} from 'react-dom/server';
import renderRadium from 'cat-components/lib/bin/render-radium';

const root = process.cwd();

export default (Component, options) => { // eslint-disable-line react/display-name
  nunjucks.configure(path.resolve(root, options.root || './views'));

  options.content = renderToStaticMarkup(
    renderRadium(Component, {
      radiumConfig: {
        userAgent: options.ctx.request.headers['user-agent']
      }
    })
  );

  options.ctx.body = nunjucks.render(
    options.template || 'template.html',
    options
  );
};
