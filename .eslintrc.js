'use strict';

const fs = require('fs');

// set alias
const {plugins} = JSON.parse(fs.readFileSync('./.babelrc'));
const alias = plugins[0][1].alias;

module.exports = {
  globals: {
    Promise: true
  },
  extends: [
    'plugin:flowtype/recommended',
    'eslint:recommended',
    'google',
    'plugin:react/recommended',
    'cat'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      objectLiteralDuplicateProperties: true
    }
  },
  env: {
    jest: true,
    browser: true,
    node: true
  },
  plugins: [
    'react',
    'import',
    'flowtype'
  ],
  settings: {
    react: {
      pragma: 'React',
      version: '15.3'
    },
    'import/resolver': {
      'babel-module': alias
    },
    'flowtype': {
      'onlyFilesWithFlowAnnotation': true
    }
  }
};
