import React from 'react';
import { Image, Text } from '@cashfree-intl/coherent';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useAccount } from 'providers/AccountProvider';

// Utils
import hasPermission from 'utils/hasPermission';

// Images
import lockIcon from 'images/lock.svg';

// Styled
import { StyledViewAuth } from './styled';

function withReadPermission<P>(
  Component: React.ComponentType<P>,
  { code, description }: { code: number; description: string },
) {
  return (props: P & React.HTMLAttributes<HTMLElement>) => {
    const { merchantDetails, restrictionCodes } = useMerchant();
    const { accountConfig } = useAccount();

    if (hasPermission(restrictionCodes, merchantDetails.userType, [code])) {
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
          <a href={`mailto:${accountConfig.MerchantEmail}`}>
            {accountConfig.MerchantEmail}
          </a>{' '}
          to get the required access.
        </Text>
      </StyledViewAuth>
    );
  };
}

export default withReadPermission;
