'use strict';

const should = require('should');
const fetch = require('node-fetch');

require('./../lib/test/server');

describe('koa-i18n', () => {
  it('# test normal', () => new Promise((resolve) => {
    fetch('http://localhost:8000/i18n/')
      .then(res => resolve(res.text()));
  }).should.be.eventually.equal(
    '{"hello":"hello world"}'
  ));

  it('# test add options', () => new Promise((resolve) => {
    fetch('http://localhost:8000/i18n/test-options')
      .then(res => resolve(res.text()));
  }).should.be.eventually.equal(
    '{"hello":"hello world"}'
  ));
});
