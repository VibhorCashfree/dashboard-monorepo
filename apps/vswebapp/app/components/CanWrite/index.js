import React from 'react';
import PropTypes from 'prop-types';

import { usePermissionCode } from '@cashfree-intl/auth';

// Utils
import { getPermissionsResponse } from 'utils/getPermissions';

const CanWrite = ({ children, code, remove }) => {
  let checkPermissions = usePermissionCode(code) ?? false;

  if (typeof code !== 'number') {
    checkPermissions = getPermissionsResponse(code);
  }

  if (checkPermissions) {
    return children;
  }

  return (
    <span data-testid="can-write" className={remove ? 'hide' : 'invisible'}>
      {children}
    </span>
  );
};

CanWrite.propTypes = {
  children: PropTypes.any,
  code: PropTypes.number.isRequired,
  remove: PropTypes.bool,
};

export default CanWrite;
