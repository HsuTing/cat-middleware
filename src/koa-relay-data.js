'use strict';

import 'babel-polyfill';
import 'fetch-everywhere';
import {
  RecordSource,
  Store,
  Network,
  Environment,
  createOperationSelector,
  getOperation
} from 'relay-runtime';

export default (link, query, variables = {}, body) => async (ctx, next) => {
  return await new Promise(resolve => {
    const source = new RecordSource();
    const store = new Store(source);
    const network = Network.create((operation, variables) => fetch(link, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
        body
      })
    }).then(response => response.json())
      .then(data => {
        ctx.graphql_data = data;
        resolve(next());
        return data;
      }));
    const environment = new Environment({network, store});
    const operation = createOperationSelector(getOperation(query), variables);
    let snapshot;

    environment
      .execute({operation})
      .finally(() => {})
      .subscribe({
        next: () => {
          /* istanbul ignore if */
          if(snapshot)
            return;

          snapshot = environment.lookup(operation.fragment);
        }
      });
  });
};
