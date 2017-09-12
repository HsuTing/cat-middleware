'use strict';

const checkAuthority = (user = {}, requireAuthentication, authenticationLevels) => {
  const userAuthenticationLevel = authenticationLevels[user.authentication || 'none'];
  const requireAuthenticationLevel = authenticationLevels[requireAuthentication];

  if(requireAuthentication === 'none' || userAuthenticationLevel >= requireAuthenticationLevel)
    return true;

  return false;
};

export default {
  configure: (authenticationLevels = {}, env = true) => {
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
  },

  set: (authentication = 'none', redirect = '/') => (ctx, next) => {
    const {authenticationLevels, env} = ctx.authentication;
    const check = checkAuthority(
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
  }
};
