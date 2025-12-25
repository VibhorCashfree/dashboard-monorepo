import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Paper, Space, Text } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { FORMATS } from 'constants/date';
import { FS_DISPLAY_TYPE } from 'constants/fundSources';
import { STATUS } from 'containers/RechargeHistory/constants';
import { PATH_BY_MENU, MENU } from 'constants/menuItems';

// Providers
import { useDetails } from 'containers/FundSourceDetails/providers';

// Components
import StatusLabel from 'components/StatusLabel';

// Utils
import { formatAmount } from 'utils/common';

// Types
import type { LastRechargeCardProps } from '../types';

const LastRechargeCard: React.FC<LastRechargeCardProps> = ({
  data,
  fsDisplayType,
}) => {
  const { details } = useDetails();

  const basePath = `/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
    details.fundSourceId
  }/details`;

  const to: string =
    fsDisplayType === FS_DISPLAY_TYPE.CONNECTED_WALLET
      ? `${basePath}/recharge-history`
      : `${basePath}/statements?status=BANK_TRANSFER,PG_INSTANT_SETTLEMENT,PG_SETTLEMENT,AUTOCOLLECT_SETTLEMENT`;

  const utr: string = data.status === STATUS.SUCCESS ? data.utr : '';

  return (
    <Paper style={{ width: 327 }}>
      <Space
        justifyContent="space-between"
        alignItems="center"
        className="mb-1"
      >
        <Text color="bodyLight" className="m-0">
          Last Recharge
        </Text>
        <Link className="link" to={to}>
          View All
        </Link>
      </Space>
      <Text className="mb-1" variant="h28">
        {formatAmount(data.amount, details.currency)}
      </Text>

      {!data.error && (
        <>
          {data.status && (
            <StatusLabel className="mb-1" filled>
              {data.status}
            </StatusLabel>
          )}
          {utr && (
            <Text variant="p14" className="m-0 mt-2">
              <Text as="span" color="bodyLight">
                UTR -{' '}
              </Text>{' '}
              {utr}
            </Text>
          )}
          <Text variant="b12" color="bodyLight" className="mt-1">
            {data.depositTime &&
              moment(data.depositTime).format(FORMATS.TIMESTAMP)}
          </Text>
        </>
      )}
    </Paper>
  );
};

export default withErrorBoundary(LastRechargeCard);
