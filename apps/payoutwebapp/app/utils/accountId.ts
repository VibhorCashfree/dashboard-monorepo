// Constants
import { ENV } from 'constants/common';

// Utils
import Env from './env';

const getKey = () => {
  const env = Env.get();
  return env === ENV.TEST ? 'testAccountId' : 'accountId';
};

const get = () => {
  const key = getKey();
  return localStorage.getItem(key);
};

const set = (accountId: string) => {
  const key = getKey();
  localStorage.setItem(key, accountId);
};

export default {
  get,
  set,
};
