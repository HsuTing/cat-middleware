'use strict';

import 'fetch-everywhere';

export default (port, url) => new Promise(resolve => {
  fetch(`http://localhost:${port}${url}`)
    .then(res => resolve(res.text()));
});
