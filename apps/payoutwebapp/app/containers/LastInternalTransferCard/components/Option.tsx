import React from 'react';
import { Space } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Utils
import { formatAmount } from 'utils/common';

// Types
import type { OptionProps } from '../types';

const Option: React.FC<OptionProps> = ({ name, amount }) => (
  <Space justifyContent="space-between" alignItems="center">
    <span>{name}</span>
    <span className="pl-1">{formatAmount(amount)}</span>
  </Space>
);

export default withErrorBoundary(Option);
