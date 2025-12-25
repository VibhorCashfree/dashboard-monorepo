import React from 'react';

// Providers
import { useMerchant } from 'providers/MerchantProvider';

// Utils
import hasPermission from 'utils/hasPermission';

// Types
import type { Props } from './types';

const CanWrite = ({ children, code, remove }: Props) => {
  const { merchantDetails, restrictionCodes } = useMerchant();

  if (
    hasPermission(
      restrictionCodes,
      merchantDetails.userType,
      code instanceof Array ? code : [code],
    )
  ) {
    return <>{children}</>;
  }

  return <span className={remove ? 'hide' : 'invisible'}>{children}</span>;
};

export default CanWrite;
