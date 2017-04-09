'use strict';

import React from 'react';

import render from 'share/render';

export default options => {
  return ctx => {
    options.ctx = ctx;

    render(
      React.createElement(options.component),
      options
    );
  };
};
