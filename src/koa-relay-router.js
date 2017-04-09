'use strict';

import renderRelay from 'cat-components/lib/bin/render-relay';

import render from 'share/render';

export default options => {
  return ctx => {
    const {container, containerQuery, ...newOptions} = options;
    const req = ctx.req;

    options.ctx = ctx;

    return renderRelay(
      Object.assign({}, newOptions, {
        rootContainerProps: container(Object.assign({}, containerQuery, {
          isServer: true,
          props: {
            location: req.url,
            context: {}
          }
        }))
      }),
      render
    );
  };
};
