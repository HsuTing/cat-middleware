// @flow
'use strict';

import 'fetch-everywhere';

export default (
  port: number,
  url: string
): Promise<string> => new Promise(resolve => {
  fetch(`http://localhost:${port}${url}`)
    .then(res => resolve(res.text()));
});
