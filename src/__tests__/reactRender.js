'use strict';

import React from 'react';

import reactRender from './../koa-react-render';
import fetch from './utils/fetch';
import server from './utils/server';
import TestRenderReact from './utils/TestRenderReact';

let app = null;

describe('koa-react-render', () => {
  beforeAll(() => {
    app = server(router => {
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

  it('# test react', () => expect(fetch('/react-render/'))
    .resolves.toBe('<main id="root"><div>render react</div></main>\n'));

  it('# test add options', () => expect(fetch('/react-render/test-options/'))
    .resolves.toBe('<main id="root"><div>render react</div></main>test option\n'));

  afterAll(() => {
    app.close();
  });
});
