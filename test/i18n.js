'use strict';

const should = require('should');

const fetch = require('./fetch');
const i18n = require('./../lib/koa-i18n').default;

describe('koa-i18n', () => {
  let server = null;
  before(() => {
    server = require('./server')(router => {
      router.get('/i18n/', i18n(), ctx => {
        ctx.body = JSON.stringify(ctx.i18n);
      });

      router.get('/i18n/test-options', i18n({root: './i18n', i18n: 'en-us'}), ctx => {
        ctx.body = JSON.stringify(ctx.i18n);
      });
    });
  });

  it('# test normal', () => {
    return fetch('/i18n/')
      .should.be.eventually.equal(
        '{"hello":"hello world"}'
      );
  });

  it('# test add options', () => {
    return fetch('/i18n/test-options')
      .should.be.eventually.equal(
        '{"hello":"hello world"}'
      );
  });

  after(() => {
    server.close();
  });
});
