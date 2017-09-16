'use strict';

import 'node-fetch';
import {graphql} from 'react-relay';
import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime';

import relayQueryLookupRender from './../koa-relay-query-lookup-render';
import fetch from './utils/fetch';
import server from './utils/server';

let app = null;

const source = new RecordSource();
const store = new Store(source);
const network = Network.create((
  operation,
  variables
) => ({
  data: {
    data: {
      key: 'value'
    }
  }
}));

const environment = new Environment({
  network,
  store
});

describe('koa-relay-query-lookup-render', () => {
  beforeAll(() => {
    app = server(router => {
      router.get(
        '/relay-query-lookup-render/',
        relayQueryLookupRender(environment, graphql`
          query relayQueryLookupRenderQuery {
            data {
              key
            }
          }
        `),
        (ctx, next) => {
          ctx.body = ctx.records;
          return next();
        }
      );
    });
  });

  it('# normal query', () => expect(fetch('/relay-query-lookup-render/'))
    .resolves.toBeTruthy());

  afterAll(() => {
    app.close();
  });
});
