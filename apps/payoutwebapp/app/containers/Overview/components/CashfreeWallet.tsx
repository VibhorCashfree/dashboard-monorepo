import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Loader, Space, Paper, Text, Popup } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { getAccountManager } from 'services/accounts';
import {
  getLastRechargeDetails,
  getInternalTransfer,
  getRechargeBankAccounts,
  getLowBalanceThreshold,
} from 'services/fundSources';

// Utils
import { getBalanceMeta } from 'components/FundSourceBalanceCard/utils';
import { formatAmount } from 'utils/common';

// Constants
import { FORMATS } from 'constants/date';

// Providers
import { useDetails } from 'containers/FundSourceDetails/providers';

// Containers
import LastInternalTransferCard from 'containers/LastInternalTransferCard';
import LastWithdrawalCard from 'containers/LastWithdrawalCard';

// Components
import Icon from 'components/Icon';
import Copy from 'components/Copy';
import ContentLoader from 'components/ContentLoader';
import StatusLabel from 'components/StatusLabel';
import AvailableBalanceCard from './AvailableBalanceCard';
import OverdraftLimitCard from './OverdraftLimitCard';
import LowBalanceThresholdCard from './LowBalanceThresholdCard';
import LastRechargeCard from './LastRechargeCard';
import RechargeSection from './RechargeSection';

const CashfreeWallet: React.FC = () => {
  const { details } = useDetails();

  const [data, setData] = useState<{
    rechargeAccounts: any[];
    lastRecharge: any;
    internalTransfer: any;
    accountManager: any;
    lowBalanceThreshold: any;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      setLoading(true);

      const [
        rechargeAccounts,
        lastRecharge,
        internalTransfer,
        accountManager,
        lowBalanceThreshold,
      ]: any[] = await Promise.all([
        getRechargeBankAccounts(details.fundSourceId),
        getLastRechargeDetails(details.fundSourceId),
        getInternalTransfer(details.fundSourceId),
        getAccountManager(),
        getLowBalanceThreshold({ fundSourceId: details.fundSourceId }),
      ]);

      setData({
        rechargeAccounts,
        lastRecharge,
        internalTransfer,
        accountManager,
        lowBalanceThreshold,
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
          <Space gap={6}>
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
              <Text variant="h16">Cashfree Wallet</Text>
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
            <div>
              <Text color="bodyLight">Currency</Text>
              <Text className="text-wrap">{details.currency || '–'}</Text>
            </div>
          </Space>
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

          <OverdraftLimitCard
            accountManager={data.accountManager}
            currency={details.currency}
          />

          <LowBalanceThresholdCard
            fundSourceId={details.fundSourceId}
            data={data.lowBalanceThreshold}
            currency={details.currency}
          />
        </Space>

        <Space gap={3} alignItems="stretch" className="mt-3">
          <LastRechargeCard
            data={data.lastRecharge}
            fsDisplayType={details.fsDisplayType}
          />

          <LastWithdrawalCard status={details.status} />
          <LastInternalTransferCard
            data={data.internalTransfer}
            status={details.status}
          />
        </Space>

        {data.rechargeAccounts.length > 0 && (
          <RechargeSection accounts={data.rechargeAccounts} />
        )}
      </ContentLoader>
    </>
  );
};

export default withErrorBoundary(CashfreeWallet);
