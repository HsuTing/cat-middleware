'use strict';

const checkAuthority = (user = {}, require_authentication, authentication_levels) => {
  const user_authentication_level = authentication_levels[user.authentication || 'none'];
  const require_authentication_level = authentication_levels[require_authentication];

  if(require_authentication === 'none' || user_authentication_level >= require_authentication_level)
    return true;

  return false;
};

export default {
  configure: (authentication_levels = {}, env = true) => {
    if(authentication_levels.none === undefined)
      throw new Error('You must set "none" in "koa-authentication.configure".');

    if(Object.keys(authentication_levels).length === 1)
      throw new Error('You must set other authentication levels in "koa-authentication.configure", not just "none".');

    return (ctx, next) => {
      ctx.authentication = {
        authentication_levels,
        env
      };
      return next();
    };
  },

  set: (authentication = 'none', redirect = '/') => (ctx, next) => {
    const {authentication_levels, env} = ctx.authentication;
    const check = checkAuthority(
      ctx.state.user,
      authentication,
      authentication_levels
    );

    if(!env)
      return next();

    if(check)
      return next();
    else
      return ctx.redirect(redirect);
  }
};
