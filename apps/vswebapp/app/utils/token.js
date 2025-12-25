// Constants
import { TEST } from 'constants/common';

// Utils
import Env from './env';

const getKey = () => {
  const env = Env.get();
  return env === TEST ? 'gammaToken' : 'merchantToken';
};

const get = () => {
  const key = getKey();
  return localStorage.getItem(key);
};

const set = token => {
  const key = getKey();
  localStorage.setItem(key, token);
};

export default {
  get,
  set,
};
