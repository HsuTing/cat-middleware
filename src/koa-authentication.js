// @flow
'use strict';

import type {middlewareType} from 'types/middleware';

import type {
  authenticationType,
  authenticationLevels, // eslint-disable-line no-unused-vars
  env // eslint-disable-line no-unused-vars
} from 'types/authentication';

const checkAuthority = (
  user: {
    authentication?: string
  } = {},
  requireAuthentication: string,
  authenticationLevels: authenticationLevels
): boolean => {
  const userAuthenticationLevel: number = authenticationLevels[user.authentication || 'none'];
  const requireAuthenticationLevel: number = authenticationLevels[requireAuthentication];

  if(requireAuthentication === 'none' || userAuthenticationLevel >= requireAuthenticationLevel)
    return true;

  return false;
};

const configure = (
  authenticationLevels: authenticationLevels = {},
  env: env = true
): middlewareType => {
  if(authenticationLevels.none === undefined)
    throw new Error('You must set "none" in "koa-authentication.configure".');

  if(Object.keys(authenticationLevels).length === 1)
    throw new Error('You must set other authentication levels in "koa-authentication.configure", not just "none".');

  return (ctx, next) => {
    ctx.authentication = {
      authenticationLevels,
      env
    };

    return next();
  };
};

const set = (
  authentication: string = 'none',
  redirect: string = '/'
): middlewareType => (ctx, next) => {
  const {
    authenticationLevels,
    env
  }: authenticationType = ctx.authentication;
  const check: boolean = checkAuthority(
    ctx.state.user,
    authentication,
    authenticationLevels
  );

  if(!env)
    return next();

  if(check)
    return next();
  else
    return ctx.redirect(redirect);
};

export default {
  configure,
  set
};
