// Constants
import { ENV } from 'constants/common';

// Utils
import getQuery from './getQuery';

const get = () => {
  const query = getQuery();
  const env: any = query.get('env');

  // Check query params first
  if (Object.values(ENV).includes(env)) {
    return env;
  }

  return localStorage.getItem('env') || ENV.PROD;
};

const set = (env: string) => localStorage.setItem('env', env);

const isTest = () => get() === ENV.TEST;

export default {
  get,
  set,
  isTest,
};
