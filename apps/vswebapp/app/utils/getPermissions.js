import _some from 'lodash/some';
import { usePermissionCode } from '@cashfree-intl/auth';

export const getPermissionsResponse = code =>
  _some(code, permCode => usePermissionCode(permCode));
