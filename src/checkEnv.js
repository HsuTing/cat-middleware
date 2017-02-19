'use strict';

import process from 'process';

export default names => {
  if(names instanceof Array) {
    names.forEach(name => {
      if(!process.env[name])
        throw new Error(`${name} is undefined.`);
    });
  } else {
    if(!process.env[names])
      throw new Error(`${names} is undefined.`);
  }
};
