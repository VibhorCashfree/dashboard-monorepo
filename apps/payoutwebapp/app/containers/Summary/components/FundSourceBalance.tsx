import React from 'react';
import { Space } from '@cashfree-intl/coherent';

// Constants
import { MENU, LABEL_BY_MENU } from 'constants/menuItems';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Utils
import FundSourcesUtil from 'utils/fundSources';

// Components
import FundSourceBalanceCard from 'components/FundSourceBalanceCard';

// Types
import type { FundSourceBalanceProps } from '../types';

const FundSourceBalance: React.FC<FundSourceBalanceProps> = ({
  fundSources,
}) => (
  <Space gap={3} alignItems="stretch" wrap>
    {FundSourcesUtil.getActives(fundSources)
      .filter((fundSource) => fundSource.product !== 'ONE_ESCROW')
      .map((fundSource) => (
        <FundSourceBalanceCard
          key={fundSource.fundSourceId}
          fundSource={fundSource}
        />
      ))}
  </Space>
);

export default withReadPermission(FundSourceBalance, {
  code: 21503,
  description: `access ${LABEL_BY_MENU[MENU.FUND_SOURCES]} balance`,
});
