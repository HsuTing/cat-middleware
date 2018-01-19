// @flow
'use strict';

import type {authenticationType} from './authentication';

export type ctxType = {
  body: string,
  request: {
    headers: {
      'user-agent': string
    }
  },
  redirect: Function,

  graphql_data?: {},
  state: {
    user?: {
      authentication?: string
    }
  },
  authentication: authenticationType
};

export type nextType = () => {
};

export type middlewareType = (
  ctx: ctxType,
  next: nextType
) => {
};
