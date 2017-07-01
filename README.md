# Cat-middleware [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
Middleware of koa server.

## Middleware
#### koa-react-render
Render `html` with `react` and `nunjucks`. If you need to use `radium`. You will get `radiumConfig` as `props` to your `component`.

- Install: `nunjucks`, `react` and `react-dom`.

###### Arguments
- `component`: This component is used to render to the template.
- `options(default: {})`
  - `root(default: './views')`: This is the folder of the templates which is for `nunjucks`.
  - `renderKey(default: 'content')`: This is the variable in template which will be replace with `component`.
  - `template(default: 'template.html'`): This is the template of the html.
  - You can add other variables for your template.

- Example:

```js
import reactRender from 'cat-middleware/lib/koa-react-render';

const render = reactRender();
...
app.use(render(
  <div>render react</div>
));
...
```

#### koa-i18n
Read json file and use it as string.

###### Arguments
- `options(default: {})`
  - `root(default: './i18n')`: This is the folder of the files.
  - `i18n(default: 'en-us')`: This is the default language for this middleware.

- Example

```js
import i18n from 'cat-middleware/lib/koa-i18n';

...
app.use(i18n());
...
// Then you can use `i18n` in your `ctx`.
```

#### koa-bot-fb
- Install: `request`.
- Example:

```js
...
import * as FBBot from 'cat-middleware/lib/koa-bot-fb';
...
router.get('/webhook', body(), FBBot.verifyToken);
router.post('/webhook', body(), FBBot.receivedMessage(FBReceivedMessage));
...
```

#### koa-bot-line
- Install: `request`.
- Example:

```js
...
import * as LineBot from 'cat-middleware/lib/koa-bot-line';
...
router.post('/line', body(), LineBot.receivedMessage(LineReceivedMessage));
...
```

- See more information in [code](./src).

## License
MIT © [hsuting](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-middleware.svg
[npm-url]: https://npmjs.org/package/cat-middleware
[travis-image]: https://travis-ci.org/HsuTing/cat-middleware.svg?branch=master
[travis-url]: https://travis-ci.org/HsuTing/cat-middleware
