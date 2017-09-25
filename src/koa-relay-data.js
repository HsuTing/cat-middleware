'use strict';

import 'babel-polyfill';
import 'fetch-everywhere';
import {
  createOperationSelector,
  getOperation
} from 'relay-runtime';

export default (link, query, variables = {}) => async (ctx, next) => {
  const operation = createOperationSelector(getOperation(query), variables);

  return await new Promise(resolve => {
    fetch(link, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    }).then(response => response.json())
      .then(data => {
        ctx.graphql_data = data;
        resolve(next());
      });
  });
};
