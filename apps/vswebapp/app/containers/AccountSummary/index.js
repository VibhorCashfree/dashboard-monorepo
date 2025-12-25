import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Space, Text } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
// Actions
import fetchAvailableBalanceAction from 'redux/actions/fetchAvailableBalance';
import fetchRechargeAccountsAction from 'redux/actions/fetchRechargeAccounts';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Services
import {
  getRechargeBankAccounts,
  getLastRechargeDetails,
  getLowBalanceThreshold,
} from 'services/accounts';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Constants
import { KNOW_MORE } from 'constants/urls';

// Containers
import LastWithdrawalCard from 'containers/LastWithdrawalCard';

// Components
import ContentLoader from 'components/ContentLoader';
import AvailableBalanceCard from './components/AvailableBalanceCard';
import LastRechargeCard from './components/LastRechargeCard';
import LowBalanceThresholdCard from './components/LowBalanceThresholdCard';
import RechargeSection from './components/RechargeSection';

const AccountSummary = ({
  balance,
  fetchAvailableBalance,
  rechargeAccounts,
  fetchRechargeAccounts,
}) => {
  const { fundSourceDetails } = useContext(AccountContext);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailableBalance(_get(fundSourceDetails, 'paymentInstrumentId'));
    fetchRechargeAccounts(_get(fundSourceDetails, 'fundSourceId'));
  }, []);

  useEffect(() => {
    (async function fetchData() {
      const [lastRecharge, lowBalanceThreshold] = await Promise.all([
        getLastRechargeDetails(_get(fundSourceDetails, 'fundSourceId')),
        getLowBalanceThreshold({
          fundSourceId: _get(fundSourceDetails, 'fundSourceId'),
        }),
      ]);

      setData({
        lastRecharge,
        lowBalanceThreshold,
      });

      setLoading(false);
    })();
  }, []);

  const renderCards = () => {
    if (!data) {
      return;
    }

    return (
      <>
        <Space gap={3} alignItems="flex-start">
          <AvailableBalanceCard isWallet balance={balance} />
          <LowBalanceThresholdCard data={data.lowBalanceThreshold} />
        </Space>
        <Space gap={3} alignItems="stretch" className="mt-3">
          <LastRechargeCard data={data.lastRecharge} />
          <LastWithdrawalCard />
        </Space>

        {rechargeAccounts.length > 0 && (
          <RechargeSection accounts={rechargeAccounts} />
        )}
      </>
    );
  };

  return (
    <>
      <Text className="my-2" color="bodyLight">
        <a
          href={KNOW_MORE.ACCOUNT.SUMMARY}
          target="_blank"
          data-event-name="Link"
        >
          Know more
        </a>{' '}
        about how to manage your funds.
      </Text>
      <ContentLoader loading={loading}>{renderCards()}</ContentLoader>
    </>
  );
};

AccountSummary.propTypes = {
  balance: PropTypes.string,
  fetchAvailableBalance: PropTypes.func.isRequired,
};

const mapStateToProps = ({ availableBalance, rechargeAccounts }) => ({
  balance: availableBalance,
  rechargeAccounts,
});

const mapDispatchToProps = dispatch => ({
  fetchAvailableBalance: obj => dispatch(fetchAvailableBalanceAction(obj)),
  fetchRechargeAccounts: id => dispatch(fetchRechargeAccountsAction(id)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withReadPermission(withConnect(AccountSummary), {
  code: 21503,
  description: 'access Account Summary',
});
