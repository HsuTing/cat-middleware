'use strict';

import Koa from 'koa';
import Router from 'koa-better-router';
import convert from 'koa-convert';
import session from 'koa-generic-session';
import React from 'react';

import reactRender from './../koa-react-render';
import i18n from './../koa-i18n';

import TestRenderReact from './TestRenderReact';

const app = new Koa();
app.use(convert(session()));

// router
const router = Router().loadMethods();

router.get('/react-render/', reactRender(
  <TestRenderReact />
));

router.get('/react-render/test-options/', reactRender(
  <TestRenderReact />, {
    test_option: 'test option'
  }
));

router.get('/i18n/', i18n(), ctx => {
  ctx.body = JSON.stringify(ctx.i18n);
});

router.get('/i18n/test-options', i18n({i18n: 'en-us'}), ctx => {
  ctx.body = JSON.stringify(ctx.i18n);
});

app.use(router.middleware());

app.listen(8000);
