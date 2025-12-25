// Constants
import { TEST } from 'constants/common';

// Utils
import Env from './env';

const getKey = () => {
  const env = Env.get();
  return env === TEST ? 'testAccountId' : 'accountId';
};

const get = () => {
  const key = getKey();
  return localStorage.getItem(key);
};

const set = accountId => {
  const key = getKey();
  localStorage.setItem(key, accountId);
};

export default {
  get,
  set,
  getKey,
};
