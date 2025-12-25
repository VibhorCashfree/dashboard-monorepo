import React, { useState } from 'react';
import { Paper, Space, Text } from '@cashfree-intl/coherent';

// Components
import Icon from 'components/Icon';
import PreferenceOption from './PreferenceOption';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useMerchant } from 'providers/MerchantProvider';

// Utils
import hasPermission from 'utils/hasPermission';

// Constants
import { preferencesByType, preferenceTypeDescription } from '../constants';

// Types
import type { PreferenceListProps } from '../types';

const PreferenceList: React.FC<PreferenceListProps> = ({ preferenceType }) => {
  const { merchantDetails, restrictionCodes } = useMerchant();

  const [show, setShow] = useState(false);

  const canUpdate: boolean = hasPermission(
    restrictionCodes,
    merchantDetails.userType,
    [22007],
  );

  return (
    <Paper className="my-1 pointer">
      <Space
        justifyContent="space-between"
        alignItems="center"
        className="mb-2"
      >
        <div>
          <Text as="span" variant="h16">
            {preferenceType}
          </Text>
          <Text variant="p14" color="bodyLight">
            {preferenceTypeDescription[preferenceType]}
          </Text>
        </div>
        <Icon
          name={show ? 'chevron-up' : 'chevron-down'}
          onClick={() => setShow((prev: boolean) => !prev)}
        />
      </Space>
      {show &&
        preferencesByType[preferenceType]?.map(
          (preference: { name: string }) => (
            <PreferenceOption
              key={preference.name}
              preferenceType={preferenceType}
              preferenceName={preference.name}
              canUpdate={canUpdate}
            />
          ),
        )}
    </Paper>
  );
};

export default withErrorBoundary(PreferenceList);
