import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Text, Image } from '@cashfree-intl/coherent';
import { usePermissionCode } from '@cashfree-intl/auth';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import { getPermissionsResponse } from 'utils/getPermissions';

// Images
import lockIcon from 'images/lock.svg';

// Styled
import { StyledViewAuth } from './styled';

const withReadPermission = (Component, { code, description }) => props => {
  const { accountInfo } = useContext(AccountContext);

  let checkPermissions = usePermissionCode(code) ?? false;

  if (typeof code !== 'number') {
    checkPermissions = getPermissionsResponse(code);
  }

  if (checkPermissions) {
    return <Component {...props} />;
  }

  return (
    <StyledViewAuth>
      <Image inline src={lockIcon} />
      <Text className="mb-3" variant="h16">
        You do not have the permission to {description}.
      </Text>
      <Text color="bodyLight">
        Contact{' '}
        <a href={`mailto:${accountInfo?.email}`}>{accountInfo?.email}</a> to get
        the required access.
      </Text>
    </StyledViewAuth>
  );
};

withReadPermission.propTypes = {
  Component: PropTypes.elementType.isRequired,
  code: PropTypes.number || PropTypes.arrayOf(PropTypes.number),
};

export default withReadPermission;
