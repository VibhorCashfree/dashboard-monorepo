import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Space,
  Text,
  DateFilter,
} from '@cashfree-intl/coherent';
import _size from 'lodash/size';
import _get from 'lodash/get';
import _remove from 'lodash/remove';

// Actions
import fetchAvailableBalanceAction from 'redux/actions/fetchAvailableBalance';
import fetchFreeCreditsAction from 'redux/actions/fetchFreeCredits';

// Constants
import {
  DATE_OPTIONS_WITH_TODAY as DATE_OPTIONS,
  FORMATS,
} from 'constants/date';

// Helpers
import { formattedDate } from 'helpers/common';

// Providers
import { AccountContext } from 'providers/AccountProvider';
import { MerchantContext } from 'providers/MerchantProvider';

// Services
import { getStats } from 'services/summary';

// Utils
import NotificationConfig from 'utils/notification';

// Components
import Loader from 'components/Loader';
import InfographicBarChart from './components/InfographicBarChart';

export const Summary = ({
  availableBalance,
  fetchAvailableBalance,
  fetchFreeCredits,
}) => {
  const { accountList } = useContext(MerchantContext);
  const { preferences, fundSourceDetails } = useContext(AccountContext);

  const [graphData, setGraphData] = useState();
  const [dateValue, setDateValue] = useState(DATE_OPTIONS[1]);
  const [alertType, setAlertType] = useState();
  const [loading, setLoading] = useState(false);
  const [showTwoFA, setShowTwoFA] = useState(() =>
    NotificationConfig.get().includes('2FA'),
  );
  const [showApiKey, setShowApiKey] = useState(() =>
    NotificationConfig.get().includes('API_KEY'),
  );

  useEffect(() => {
    if (!_size(accountList)) {
      return;
    }

    fetchAvailableBalance(_get(fundSourceDetails, 'paymentInstrumentId'));
    fetchFreeCredits();
  }, []);

  useEffect(() => {
    (async function fetchData() {
      const [startDate, endDate] = dateValue.range;

      const queryObj = {
        startDate: formattedDate(startDate, FORMATS.START_DATE),
        endDate: formattedDate(endDate, FORMATS.END_DATE),
      };

      setLoading(true);

      const [bavStats, upiStats, panStats] = await Promise.all([
        getStats({ ...queryObj, reportType: 'BAV' }),
        getStats({ ...queryObj, reportType: 'UPI' }),
        getStats({ ...queryObj, reportType: 'PAN' }),
      ]);

      setGraphData({
        bavStats,
        upiStats,
        panStats,
      });

      setLoading(false);
    })();
  }, [dateValue]);

  const handleNotification = type => () => {
    if (type === 'API_KEY') {
      setShowApiKey(false);
    }
    if (type === '2FA') {
      setShowTwoFA(false);
    }
    NotificationConfig.set(
      _remove(NotificationConfig.get(), notification => notification !== type),
    );
  };

  const isToday = dateValue.displayText === 'Today';

  if (!graphData || loading) {
    return <Loader />;
  }

  return (
    <>
      <Space className="my-3" gap={2}>
        <DateFilter
          rangeSize={31}
          value={dateValue}
          options={DATE_OPTIONS}
          onSelect={setDateValue}
          min={new Date(2021, 3, 1)}
          alertText="Data available for transfers initiated on or after 1st April 2021"
        />
      </Space>
      {_get(preferences, 'activated.bav', false) && (
        <>
          <Text variant="h20" className="mt-4 mb-3">
            Bank Account
          </Text>
          <InfographicBarChart
            type="Bank Account Verifications"
            linkTo="/bav/all"
            data={graphData.bavStats}
            unitInHours={isToday}
            dateValue={dateValue}
          />
        </>
      )}
      {_get(preferences, 'activated.pan', false) && (
        <>
          <Text variant="h20" className="mt-4 mb-3">
            PAN
          </Text>
          <InfographicBarChart
            type="PAN Verifications"
            linkTo="/pan/all"
            data={graphData.panStats}
            unitInHours={isToday}
            dateValue={dateValue}
          />
        </>
      )}
      {_get(preferences, 'activated.upi', false) && (
        <>
          <Text variant="h20" className="mt-4 mb-3">
            UPI
          </Text>
          <InfographicBarChart
            type="UPI Verifications"
            linkTo="/upi/all"
            data={graphData.upiStats}
            unitInHours={isToday}
            dateValue={dateValue}
          />
        </>
      )}
    </>
  );
};

Summary.propTypes = {
  availableBalance: PropTypes.object,
  fetchAvailableBalance: PropTypes.func.isRequired,
  fetchFreeCredits: PropTypes.func.isRequired,
};

const mapStateToProps = ({ availableBalance }) => ({
  availableBalance,
});

const mapDispatchToProps = dispatch => ({
  fetchAvailableBalance: obj => dispatch(fetchAvailableBalanceAction(obj)),
  fetchFreeCredits: () => dispatch(fetchFreeCreditsAction()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(Summary);
