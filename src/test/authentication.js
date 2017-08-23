'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars

import authentication from './../koa-authentication';
import fetch from './fetch';
import server from './server';

let app = null;

describe('koa-authentication', () => {
  describe('env: true', () => {
    before(() => {
      app = server(router => {
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
        (() => {
          authentication.configure();
        }).should.be.throw('You must set "none" in "koa-authentication.configure".');
      });

      it('## just set "none"', () => {
        (() => {
          authentication.configure({
            none: 0
          });
        }).should.be.throw('You must set other authentication levels in "koa-authentication.configure", not just "none".');
      });
    });

    it('# test "none"', () => fetch('/authentication/')
      .should.be.eventually.equal('test none'));

    describe('# test "user"', () => {
      it('## authentication', () => fetch('/authentication/test-user/')
        .should.be.eventually.equal('test user'));

      it('## authentication fail', () => fetch('/authentication/test-user/fail/')
        .should.be.eventually.equal('authentication failed for user'));
    });

    after(() => {
      app.close();
    });
  });

  describe('env: false', () => {
    before(() => {
      app = server(router => {
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

    it('# "none" authentication can pass "user" authentication', () => fetch('/authentication/test-user/fail/')
      .should.be.eventually.equal('test user'));

    after(() => {
      app.close();
    });
  });
});
