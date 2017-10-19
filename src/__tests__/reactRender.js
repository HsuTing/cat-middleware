'use strict';

import React from 'react';

import reactRender from './../koa-react-render';
import fetch from './utils/fetch';
import server from './utils/server';
import TestRenderReact from './utils/TestRenderReact';

const port = 8003;
let app = null;

describe('koa-react-render', () => {
  beforeAll(() => {
    app = server(port, router => {
      router.get('/react-render/', reactRender(
        React.createElement(TestRenderReact)
      ));

      router.get('/react-render/test-options/', reactRender(
        React.createElement(TestRenderReact), {
          root: './views',
          renderKey: 'content',
          template: 'template.html',
          test_option: 'test option'
        }
      ));
    });
  });

  it('# test react', () => expect(fetch(port, '/react-render/'))
    .resolves.toBe('<main id="root"><div>render react</div></main>\n'));

  it('# test add options', () => expect(fetch(port, '/react-render/test-options/'))
    .resolves.toBe('<main id="root"><div>render react</div></main>test option\n'));

  afterAll(() => {
    app.close();
  });
});
