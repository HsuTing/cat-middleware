'use strict';

import 'babel-polyfill';
import {
  createOperationSelector,
  getOperation
} from 'relay-runtime';

export default (environment, query, variables = {}) => async (ctx, next) => {
  const operation = createOperationSelector(
    getOperation(query),
    variables
  );
  let snapshot;

  return await new Promise(resolve => {
    environment
      .execute({operation, cacheConfig: {add: true}})
      .finally(() => {
        ctx.graphql_data = snapshot.data;
        resolve(next());
      })
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
