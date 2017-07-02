'use strict';

const fetch = require('node-fetch');

module.exports = url => new Promise(resolve => {
  fetch(`http://localhost:8000${url}`)
    .then(res => resolve(res.text()));
});
