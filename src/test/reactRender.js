'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars
import React from 'react';

import reactRender from './../koa-react-render';
import fetch from './fetch';
import server from './server';
import TestRenderReact from './TestRenderReact';

let app = null;

describe('koa-react-render', () => {
  before(() => {
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

  it('# test react', () => fetch('/react-render/')
    .should.be.eventually.equal(
      '<main id="root"><div>render react</div></main>\n'
    ));

  it('# test add options', () => fetch('/react-render/test-options/')
    .should.be.eventually.equal(
      '<main id="root"><div>render react</div></main>test option\n'
    ));

  after(() => {
    app.close();
  });
});
