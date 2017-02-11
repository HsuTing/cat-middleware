'use strict';

import path from 'path';
import process from 'process';
import nunjucks from 'nunjucks';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import Wrapper from 'cat-components/lib/Wrapper';

const root = process.cwd();
nunjucks.configure(path.resolve(root, './views'));

const render = (ctx, options, content) => {
  ctx.body = nunjucks.render(
    options.template ? options.template : 'template.html',
    Object.assign({}, options, {
      content
    })
  );
};

const radium = (component, ctx) => {
  return React.createElement(Wrapper, {
    radiumConfig: {
      userAgent: ctx.request.headers['user-agent']
    }
  }, component);
};

const redux = (component, options) => {
  const Provider = require('react-redux').Provider;
  const createStore = require('redux').createStore;

  return React.createElement(Provider, {
    store: (
      options.data === undefined ?
      createStore(options.reducer) :
      createStore(options.reducer, options.data)
    )
  }, component);
};

const router = (component, options, ctx) => {
  const match = require('react-router').match;
  const RouterContext = require('react-router').RouterContext;
  const res = ctx.response;

  match({routes: component, location: ctx.request.url}, (error, redirextLocation, renderProps) => {
    if(error)
      res.status = 500;
    else if(redirextLocation)
      res.redirect(redirextLocation.pathname + redirextLocation.search);
    else if(renderProps) {
      let output = React.createElement(RouterContext, renderProps);

      if(options.redux)
        output = redux(output, options, ctx);

      render(
        ctx, options,
        renderToStaticMarkup(radium(output, ctx))
      );
    } else
      res.status = 404;
  });
}

export default options => {
  return ctx => {
    if(options.router) {
      router(options.component, options, ctx);
    }

    let output = React.createElement(options.component);
    if(options.redux)
      output = redux(output, options, ctx);

    render(
      ctx, options,
      renderToStaticMarkup(radium(output, ctx))
    );
  };
};
