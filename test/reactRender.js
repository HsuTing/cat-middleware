'use strict';

const should = require('should');
const fetch = require('node-fetch');

const renderContent = content => (
  `<main id="root">${content}</main>\n`
);

describe('koa-react-render', () => {
  describe('# test react', () => {
    it('should be equal to "test"', () => new Promise((resolve) => {
      fetch('http://localhost:8000/react-render/')
        .then(res => resolve(res.text()));
    }).should.be.eventually.equal(
      renderContent('<div>render react</div>')
    ));
  });
});
