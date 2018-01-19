// @flow

export type authenticationLevels = {
  [string]: number
};

export type env = boolean;

export type authenticationType = {
  authenticationLevels: authenticationLevels,
  env: env
};
