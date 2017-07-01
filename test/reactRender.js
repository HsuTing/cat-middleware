'use strict';

const should = require('should');
const fetch = require('node-fetch');

require('./../lib/test/server');

describe('koa-react-render', () => {
  it('# test react', () => new Promise((resolve) => {
    fetch('http://localhost:8000/react-render/')
      .then(res => resolve(res.text()));
  }).should.be.eventually.equal(
    '<main id="root"><div>render react</div></main>\n'
  ));

  it('# test add options', () => new Promise((resolve) => {
    fetch('http://localhost:8000/react-render/test-option/')
      .then(res => resolve(res.text()));
  }).should.be.eventually.equal(
    '<main id="root"><div>render react</div></main>test option\n'
  ));
});
