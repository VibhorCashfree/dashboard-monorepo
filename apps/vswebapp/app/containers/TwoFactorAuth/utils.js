// Utils
import Regex from 'utils/regex';

export const isIpDisabled = (ips, value) => {
  if (ips.length === 0) {
    if (Regex.ip(value)) {
      return false;
    }

    return true;
  }

  if (ips.length >= 25) {
    return true;
  }

  return false;
};
