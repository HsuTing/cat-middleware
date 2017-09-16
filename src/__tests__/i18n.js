'use strict';

import i18n from './../koa-i18n';
import fetch from './utils/fetch';
import server from './utils/server';

let app = null;

describe('koa-i18n', () => {
  beforeAll(() => {
    app = server(router => {
      router.get('/i18n/', i18n(), ctx => {
        ctx.body = JSON.stringify(ctx.i18n);
      });

      router.get('/i18n/test-options', i18n({root: './i18n', i18n: 'en-us'}), ctx => {
        ctx.body = JSON.stringify(ctx.i18n);
      });
    });
  });

  it('# test normal', () => expect(fetch('/i18n/'))
    .resolves.toBe('{"hello":"hello world"}'));

  it('# test add options', () => expect(fetch('/i18n/test-options'))
    .resolves.toBe('{"hello":"hello world"}'));

  afterAll(() => {
    app.close();
  });
});