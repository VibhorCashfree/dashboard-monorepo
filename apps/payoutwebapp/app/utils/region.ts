// Constants
import { REGION } from 'constants/common';

const get = () => {
  const region = localStorage.getItem('cfrnCode') || REGION.IN;
  return (region === REGION.MISSING_REGION ? REGION.IN : region) as REGION;
};

export default {
  get,
};
