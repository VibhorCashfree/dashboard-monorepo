// Constants
import { PROD, TEST } from 'constants/common';

// Utils
import getQuery from './getQuery';

const get = () => {
  const query = getQuery();
  const env = query.get('env');

  // Check query params first
  if ([TEST, PROD].includes(env)) {
    return env;
  }

  return localStorage.getItem('env') || PROD;
};

const set = env => localStorage.setItem('env', env);

const isTest = () => get() === TEST;

export default {
  get,
  set,
  isTest,
};
