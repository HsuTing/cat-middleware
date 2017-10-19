'use strict';

import authentication from './../koa-authentication';
import fetch from './utils/fetch';
import server from './utils/server';

let app = null;

describe('koa-authentication', () => {
  describe('env: true', () => {
    const port = 8000;

    beforeAll(() => {
      app = server(port, router => {
        router.get('/authentication/fail/', ctx => {
          ctx.body = 'authentication failed for user';
        });

        router.get('/authentication/', authentication.set(), ctx => {
          ctx.body = 'test none';
        });

        router.get(
          '/authentication/test-user/', (ctx, next) => {
            ctx.state.user = {};
            ctx.state.user.authentication = 'user';
            return next();
          }, authentication.set('user', '/authentication/fail/'), ctx => {
            ctx.body = 'test user';
          }
        );

        router.get('/authentication/test-user/fail/',
          authentication.set('user', '/authentication/fail/')
        );
      }, app => {
        app.use(authentication.configure({
          none: 0,
          user: 1
        }));
      });
    });

    describe('# test configure', () => {
      it('## without setting', () => {
        expect(() => {
          authentication.configure();
        }).toThrowError('You must set "none" in "koa-authentication.configure".');
      });

      it('## just set "none"', () => {
        expect(() => {
          authentication.configure({
            none: 0
          });
        }).toThrowError('You must set other authentication levels in "koa-authentication.configure", not just "none".');
      });
    });

    it('# test "none"', () => expect(fetch(port, '/authentication/'))
      .resolves.toBe('test none'));

    describe('# test "user"', () => {
      it('## authentication', () => expect(fetch(port, '/authentication/test-user/'))
        .resolves.toBe('test user'));

      it('## authentication fail', () => expect(fetch(port, '/authentication/test-user/fail/'))
        .resolves.toBe('authentication failed for user'));
    });

    afterAll(() => {
      app.close();
    });
  });

  describe('env: false', () => {
    const port = 8001;

    beforeAll(() => {
      app = server(port, router => {
        router.get('/authentication/fail/');

        router.get('/authentication/test-user/fail/',
          authentication.set('user', '/authentication/fail/'),
          ctx => {
            ctx.body = 'test user';
          }
        );
      }, app => {
        app.use(authentication.configure({
          none: 0,
          user: 1
        }, false));
      });
    });

    it('# "none" authentication can pass "user" authentication', () =>
      expect(fetch(port, '/authentication/test-user/fail/')).resolves.toBe('test user')
    );

    afterAll(() => {
      app.close();
    });
  });
});
