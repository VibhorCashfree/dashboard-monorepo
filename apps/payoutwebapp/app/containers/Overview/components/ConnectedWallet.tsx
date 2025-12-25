import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Loader,
  Image,
  Space,
  Paper,
  Text,
  Popup,
} from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { getAccountManager } from 'services/accounts';
import {
  getLastRechargeDetails,
  getInternalTransfer,
} from 'services/fundSources';

// Utils
import Banks from 'utils/banks';
import { getBalanceMeta } from 'components/FundSourceBalanceCard/utils';
import { formatAmount } from 'utils/common';

// Constants
import { FORMATS } from 'constants/date';

// Providers
import { useDetails } from 'containers/FundSourceDetails/providers';

// Components
import Icon from 'components/Icon';
import Copy from 'components/Copy';

import ContentLoader from 'components/ContentLoader';
import StatusLabel from 'components/StatusLabel';
import AvailableBalanceCard from './AvailableBalanceCard';
import LastRechargeCard from './LastRechargeCard';

const ConnectedWallet: React.FC = () => {
  const { details } = useDetails();

  const [data, setData] = useState<
    | {
        lastRecharge: any;
        internalTransfer: any;
        accountManager: any;
      }
    | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      setLoading(true);

      const [lastRecharge, internalTransfer, accountManager] =
        await Promise.all([
          getLastRechargeDetails(details.fundSourceId),
          getInternalTransfer(details.fundSourceId),
          getAccountManager(),
        ]);

      setData({
        lastRecharge,
        internalTransfer,
        accountManager,
      });

      setLoading(false);
    })();
  }, [details.fundSourceId]);

  const balanceMeta = getBalanceMeta({
    fsDisplayType: details.fsDisplayType,
    currency: details.currency,
    isConnected: details.fsType === 'CONNECTED',
    accountHolderName: details.accountHolderName,
    data: details.fsBalance,
  });

  const { availableBalance } = details.fsBalance;

  if (!data) {
    return <Loader active />;
  }

  return (
    <>
      <Paper className="mb-3">
        <Space justifyContent="space-between">
          <div>
            <Space gap={6} className="mb-3">
              <div>
                <Text color="bodyLight" className="mb-1">
                  Reference Name
                </Text>
                <Text variant="h16" className="text-ellipsis">
                  {details.displayName || '–'}
                </Text>
              </div>
              <div>
                <Text color="bodyLight" className="mb-1">
                  Reference ID
                  <Popup
                    position="right center"
                    content="Unique identifier for the fund source. You need to use this while making payouts via API and bulk transfers."
                    trigger={
                      <span>
                        <Icon
                          name="info"
                          className="pointer ml-1"
                          verticalAlign="top"
                        />
                      </span>
                    }
                  />
                </Text>
                <Text variant="h16">
                  {details.paymentInstrumentId}
                  <Copy value={details.paymentInstrumentId} />
                </Text>
              </div>
              <div>
                <Text color="bodyLight" className="mb-1">
                  Type
                </Text>
                <Text variant="h16">Connected Wallet</Text>
              </div>
              <div>
                <Text color="bodyLight" className="mb-1">
                  Added At
                </Text>
                <Text className="text-wrap">
                  {moment(details.addedOn).format(FORMATS.TIMESTAMP)}
                </Text>
              </div>
              <div>
                <Text color="bodyLight" className="mb-1">
                  Added By
                </Text>
                <Text className="text-wrap">{details.merchantName || '–'}</Text>
              </div>
            </Space>
            <Space gap={6}>
              <div>
                <Text color="bodyLight" className="mb-1">
                  Name of Bank
                </Text>
                <Image inline width="60" src={Banks.getIcon(details.ifsc)} />
              </div>
              <div>
                <Text color="bodyLight" className="mb-1">
                  A/c No. / IFSC
                </Text>
                <Text className="text-wrap">
                  {details.bankAccount} / {details.ifsc || '–'}
                </Text>
              </div>
              <div>
                <Text color="bodyLight">Currency</Text>
                <Text className="text-wrap">{details.currency || '–'}</Text>
              </div>
            </Space>
          </div>
          <Space gap={4}>
            <div className="text-right">
              <StatusLabel className="mb-1" filled>
                {details.status}
              </StatusLabel>
            </div>
          </Space>
        </Space>
      </Paper>

      <ContentLoader loading={loading}>
        <Space gap={3} alignItems="flex-start">
          <AvailableBalanceCard
            showBalance
            availableBalance={
              availableBalance
                ? formatAmount(availableBalance, details.currency)
                : null
            }
            balanceMeta={balanceMeta}
          />
          <LastRechargeCard
            data={data.lastRecharge}
            fsDisplayType={details.fsDisplayType}
          />
        </Space>
      </ContentLoader>
    </>
  );
};

export default withErrorBoundary(ConnectedWallet);
