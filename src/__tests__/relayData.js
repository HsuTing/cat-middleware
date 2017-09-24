'use strict';

import 'node-fetch';
import {graphql} from 'react-relay';
import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime';

import relayData from './../koa-relay-data';
import fetch from './utils/fetch';
import server from './utils/server';

let app = null;

const data = {
  data: {
    key: 'value'
  }
};
const source = new RecordSource();
const store = new Store(source);
const network = Network.create((
  operation,
  variables
) => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      data: data
    });
  }, 100);
}));

const environment = new Environment({
  network,
  store
});

describe('koa-relay-data', () => {
  beforeAll(() => {
    app = server(router => {
      router.get(
        '/relay-data/',
        relayData(environment, graphql`
          query relayDataQuery {
            data {
              key
            }
          }
        `),
        (ctx, next) => {
          ctx.body = ctx.graphql_data;
          return next();
        }
      );
    });
  });

  it('# normal query', () => expect(
    fetch('/relay-data/')
      .then(data => JSON.parse(data))
  ).resolves.toMatchObject(data));

  afterAll(() => {
    app.close();
  });
});
