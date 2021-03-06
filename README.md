# Cat-middleware [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
Middleware of koa server. See more information in [code](./src) and [here](./src/__tests__).

## Middleware
#### koa-react-render
Render `html` with `react` and `nunjucks`. If you need to use `radium`. You will get `radiumConfig` as `props` to your `component`.

###### Install
- `nunjucks`
- `react`
- `react-dom`

###### Arguments
- `component`: This component is used to render to the template.
- `options(default: {})`
  - `root(default: './views')`: This is the folder of the templates which is for `nunjucks`.
  - `renderKey(default: 'content')`: This is the variable in template which will be replace with `component`.
  - `template(default: 'template.html'`): This is the template of the html.
  - You can add other variables for your template.

###### Example
```js
import reactRender from 'cat-middleware/lib/koa-react-render';

...
app.use(reactRender(
  <div>render react</div>
));
...
```



#### koa-authentication
Use to check the authentication. You must have `user` in `ctx.state` and `authentication` in `user`. You can use `koa-passport` to do this.

###### koa-authentication.configure
- Arguments
  - `authentication_levels(default: {})`: This is used to check the authentication. For example, it will be like `{none: 0, user: 1, superuser: 999}`.
  - `env(default: true)`: If this is false, this middleware will not check the authentication. Remeber to use this with `process.env.NODE_ENV`.

###### koa-authentication.set
- Arguments
  - `authentication(default: 'none')`: Use to set authentication in `url`.
  - `redirect(default: '/')`: Redirect to the url when user dose not pass the authentication.

###### Example
```js
import authentication from 'cat-middleware/lib/koa-authentication';

...
app.use(authentication.configure({
  none: 0,
  user: 1
}, process.env.NODE_ENV === 'production'));

...
router.get(
  '/authentication/',
  authentication.set('user', '/authentication/fail/'), ctx => {
    // do something here
  }
);
...
```



#### koa-relay-data
Use to get the data from `fetch` with `react-relay`.

###### Install
- `babel-polyfill`
- `fetch-everywhere`
- `react-relay`

###### Arguments
- `link`
- `query`
- `variables`

###### Example
```js
import relayData from 'cat-middleware/lib/koa-relay-data';

...
app.use(relayData(
  link, graphql`
    query relayData {
      data {
        key
      }
    }
  `
));
...
// Then you can get the data `graphql_data` in your `ctx`.
```



## License
MIT © [hsuting](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-middleware.svg
[npm-url]: https://www.npmjs.com/package/cat-middleware
[travis-image]: https://travis-ci.org/HsuTing/cat-middleware.svg?branch=master
[travis-url]: https://travis-ci.org/HsuTing/cat-middleware
