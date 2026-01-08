import React from 'react';
import PropTypes from 'prop-types';
import { CanWrite } from '@dashboard-monorepo/shared';

import { usePermissionCode } from '@cashfree-intl/auth';

// Utils
import { getPermissionsResponse } from 'utils/getPermissions';

const VSCanWrite = ({ children, code, remove }) => {
  let isAllowed = usePermissionCode(code) ?? false;

  if (typeof code !== 'number') {
    isAllowed = getPermissionsResponse(code);
  }

  return (
    <CanWrite isAllowed={isAllowed} remove={remove}>
      {children}
    </CanWrite>
  );
};

VSCanWrite.propTypes = {
  children: PropTypes.any,
  code: PropTypes.number.isRequired,
  remove: PropTypes.bool,
};

export default VSCanWrite;
