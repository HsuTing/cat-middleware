'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars

import i18n from './../koa-i18n';
import fetch from './fetch';
import server from './server';

let app = null;

describe('koa-i18n', () => {
  before(() => {
    app = server(router => {
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
    app.close();
  });
});
