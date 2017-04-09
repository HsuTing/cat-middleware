'use strict';

import renderRelay from 'cat-components/lib/bin/render-relay';

import render from 'share/render';

export default options => {
  return ctx => {
    options.ctx = ctx;

    return renderRelay(options, render);
  };
};
