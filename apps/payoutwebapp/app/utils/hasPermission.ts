import { usePermissionCode } from '@cashfree-intl/auth';
import _some from 'lodash/some';
import _size from 'lodash/size';

// Constants
import { USER_TYPE } from 'constants/common';

// Utils
import Env from 'utils/env';

const hasPermission = (
  restrictionCodes: number[],
  userType: USER_TYPE,
  code: number[],
) => {
  if (Env.isTest()) {
    return true;
  }

  switch (userType) {
    case USER_TYPE.MERCHANT_ALIAS:
      return _some(code, (permCode) => usePermissionCode(permCode));

    default:
      return _size(code) ? !restrictionCodes.includes(code[0]) : true;
  }
};

export default hasPermission;
