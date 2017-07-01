'use strict';

import Koa from 'koa';
import Router from 'koa-better-router';
import React from 'react';

import reactRender from './../koa-react-render';

import TestRenderReact from './TestRenderReact';

const app = new Koa();

const router = Router().loadMethods();

router.get('/react-render/', reactRender(
  <TestRenderReact />
));

router.get('/react-render/test-option/', reactRender(
  <TestRenderReact />, {
    test_option: 'test option'
  }
));

app.use(router.middleware());

app.listen(8000);
