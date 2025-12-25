// Constants
import { TEST } from 'constants/common';

// Utils
import Env from './env';

const getKey = () => {
  const env = Env.get();
  return env === TEST ? 'PITCH_PAGES_TEST' : 'PITCH_PAGES_PROD';
};

const get = () => {
  const key = getKey();

  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(localStorage.getItem(key));
  }

  return [];
};

const set = pitchPages => {
  const pitchPageEnv = getKey();

  localStorage.setItem(pitchPageEnv, JSON.stringify(pitchPages));
};

export default {
  get,
  set,
};
