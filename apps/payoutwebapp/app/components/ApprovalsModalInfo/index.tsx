import React from 'react';
import { Space, Text } from '@cashfree-intl/coherent';
import _isUndefined from 'lodash/isUndefined';

// Utils
import { formatAmount } from 'utils/common';

// Constants
import { CURRENCY } from 'constants/common';

type Props = {
  fileName?: string;
  count: number;
  amount?: string | number;
  currency?: CURRENCY;
};

const ApprovalsModalInfo = ({ fileName, count, amount, currency }: Props) => (
  <Space direction="column" gap={2} className="mt-3">
    {!_isUndefined(fileName) && (
      <Space justifyContent="space-between">
        <Text color="bodyLight" className="text-grey">
          File Name
        </Text>
        <Text>{fileName}</Text>
      </Space>
    )}

    <Space justifyContent="space-between">
      <Text color="bodyLight" className="text-grey">
        Count
      </Text>
      <Text>{count}</Text>
    </Space>

    {!_isUndefined(amount) && (
      <Space justifyContent="space-between">
        <Text color="bodyLight" className="text-grey">
          Amount
        </Text>
        <Text>{formatAmount(amount, currency)}</Text>
      </Space>
    )}
  </Space>
);

export default ApprovalsModalInfo;
