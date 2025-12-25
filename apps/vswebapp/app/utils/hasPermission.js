// Utils
import Env from 'utils/env';

const checkMultiplePermission = (codes, multipleCodes) => {
  return multipleCodes.some(code => codes.includes(code));
};

const hasPermission = (userType, codes, code) => {
  const isMultiple = typeof code !== 'number';
  const checkPermission = isMultiple
    ? checkMultiplePermission(codes, code)
    : codes.includes(code);

  return Env.isTest() || userType !== 'MERCHANT_ALIAS' || checkPermission;
};

export default hasPermission;
