'use strict';

const should = require('should');
const React = require('react');

const fetch = require('./fetch');
const reactRender = require('./../lib/koa-react-render').default;
const TestRenderReact = require('./../lib/test/TestRenderReact').default;

describe('koa-react-render', () => {
  let server = null;
  before(() => {
    server = require('./server')(router => {
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

  it('# test react', () => {
    return fetch('/react-render/')
      .should.be.eventually.equal(
        '<main id="root"><div>render react</div></main>\n'
      );
  });

  it('# test add options', () => {
    return fetch('/react-render/test-options/')
      .should.be.eventually.equal(
        '<main id="root"><div>render react</div></main>test option\n'
      );
  });

  after(() => {
    server.close();
  });
});
