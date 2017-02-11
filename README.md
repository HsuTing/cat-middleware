# Cat-middleware [![NPM version][npm-image]][npm-url]
Middleware of koa server.

## Middleware
- koa-react
  - Need to install `nunjucks`, `react`, `react-dom` and `cat-components`.
  - Render `html` with `react` and `nunjucks`.
  - Example:

  ```javascript
  import react from 'cat-middleware/lib/koa-react';
  import Index from 'components/Index';

  ...
  app.use(react({
    component: Index,
    js: 'index',
    ENV: true // use to minify html
  }));
  ...
  ```

- koa-relay
  - Need to install `nunjucks`, `react`, `react-dom`, `isomorphic-relay` and `cat-components`.
  - Render `html` with `react`, `relay` and `nunjucks`.
  - Example:

  ```javascript
  import Relay from 'react-relay';
  import relay from 'cat-middleware/lib/koa-relay';
  import index from 'containers/index';

  const graphqlLink = 'http://localhost:8000/graphql';

  ...
  app.use(relay({
    rootContainerProps: index({input: 'index'}),
    networkLayer: new Relay.DefaultNetworkLayer(graphqlLink),
    js: 'index',
    ENV: true // use to minify html
  }));
  ...
  ```

- koa-bot-fb
  - This use `koa-better-router`, you need to use `loadMethods()`.
  - Need to install `koa-body`, `koa-better-router` and `request`.
- See more information in [code](./src).

## License
MIT © [hsuting](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-middleware.svg
[npm-url]: https://npmjs.org/package/cat-middleware
