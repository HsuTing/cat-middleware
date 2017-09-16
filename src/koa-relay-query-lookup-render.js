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

  environment.retain(operation.root);
  return await new Promise(resolve => {
    environment.sendQuery({
      operation,
      onCompleted: () => {
        ctx.records = JSON.stringify(environment.getStore().getSource());
        resolve(next());
      }
    });
  });
};
