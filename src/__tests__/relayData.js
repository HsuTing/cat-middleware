'use strict';

import {graphql} from 'react-relay';

import relayData from './../koa-relay-data';
import fetch from './utils/fetch';
import server from './utils/server';

let app = null;

const data = {
  data: {
    relayData: {
      key: 'value'
    }
  }
};

describe('koa-relay-data', () => {
  beforeAll(() => {
    app = server(router => {
      router.post('/get-data/', (ctx, next) => {
        ctx.response.type = 'json';
        ctx.response.body = JSON.stringify(data);
      });

      router.get(
        '/relay-data/',
        relayData('http://localhost:8000/get-data/', graphql`
          query relayDataQuery {
            relayData {
              key
            }
          }
        `),
        (ctx, next) => {
          ctx.body = ctx.graphql_data;
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
