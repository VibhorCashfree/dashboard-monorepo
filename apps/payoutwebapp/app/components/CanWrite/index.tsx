import React from 'react';
import { CanWrite } from '@dashboard-monorepo/shared';

// Providers
import { useMerchant } from 'providers/MerchantProvider';

// Utils
import hasPermission from 'utils/hasPermission';

// Types
import type { Props } from './types';

const CanWriteWrapper = ({ children, code, remove }: Props) => {
  const { merchantDetails, restrictionCodes } = useMerchant();

  const isAllowed = hasPermission(
    restrictionCodes,
    merchantDetails.userType,
    code instanceof Array ? code : [code],
  );

  return (
    <CanWrite isAllowed={isAllowed} remove={remove}>
      {children}
    </CanWrite>
  );
};

export default CanWriteWrapper;
