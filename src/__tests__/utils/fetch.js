'use strict';

import 'fetch-everywhere';

export default url => new Promise(resolve => {
  fetch(`http://localhost:8000${url}`)
    .then(res => resolve(res.text()));
});
