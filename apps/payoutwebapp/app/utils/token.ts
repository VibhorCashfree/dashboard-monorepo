// Constants
import { ENV } from 'constants/common';

// Utils
import Env from './env';

const getKey = () => {
  const env = Env.get();
  return env === ENV.TEST ? 'gammaToken' : 'merchantToken';
};

const get = () => {
  const key = getKey();
  return localStorage.getItem(key);
};

const set = (token: string) => {
  const key = getKey();
  localStorage.setItem(key, token);
};

export default {
  get,
  set,
};
