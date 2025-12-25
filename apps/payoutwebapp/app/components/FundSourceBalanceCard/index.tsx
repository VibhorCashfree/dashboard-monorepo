import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Image, Space, Text, Popup } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

// Services
import { getBalance } from 'services/fundSources';

// Components
import Icon from 'components/Icon';

// Constants
import { AGGREGATOR } from 'constants/fundSources';
import EVENTS from 'constants/events';
import { FORMATS } from 'constants/date';
import { REGION } from 'constants/common';
import { PATH_BY_MENU, MENU } from 'constants/menuItems';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Utils
import FundSourcesUtil from 'utils/fundSources';
import { formatAmount } from 'utils/common';
import Analytics from 'utils/analytics';
import Region from 'utils/region';
import Banks from 'utils/banks';
import { getBalanceMeta } from './utils';

// Images
import razorpayIcon from 'images/banks/razorpay.svg';
import alertTriangleImg from 'images/alert-triangle.svg';

// Styled
import { Divider } from 'styled/common';
import { StyledPaper } from './styled';

// Types
import type { Props, DataState } from './types';

const FundSourceBalanceCard = ({ fundSource, downtimes }: Props) => {
  const [data, setData] = useState<DataState>();
  const [fetchCounter, setFetchCounter] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      setLoading(true);

      const response: unknown = await getBalance(
        fundSource.paymentInstrumentId,
      );

      setData(response as DataState);
      setLoading(false);
    })();
  }, [fetchCounter]);

  const balanceMeta = getBalanceMeta({
    fsDisplayType: fundSource.fsDisplayType,
    currency: fundSource.currency,
    isConnected: fundSource.fsType === 'CONNECTED',
    accountHolderName: fundSource.accountHolderName,
    data,
  });

  const downtime = FundSourcesUtil.getDowntime(
    fundSource.connBankName,
    downtimes,
  );

  return (
    <StyledPaper>
      <header>
        <Space justifyContent="space-between" alignItems="center">
          <div>
            <Text color="bodyLight">
              Fund Source
              {downtime ? (
                <Popup
                  hoverable
                  content={
                    <Text variant="b12" color="bodyLight">
                      Fund Source down - {downtime.mode} -{' '}
                      <Link
                        to={`/${PATH_BY_MENU[MENU.DOWNTIMES]}`}
                        className="link"
                      >
                        View Details
                      </Link>
                    </Text>
                  }
                  trigger={
                    <Text as="span" variant="b12" color="danger">
                      <Image inline src={alertTriangleImg} className="ml-1" />{' '}
                      Facing Downtime
                    </Text>
                  }
                />
              ) : null}
            </Text>
            <Text className="text-ellipsis" style={{ width: 200 }}>
              {fundSource.displayName}
            </Text>
          </div>
          <Image
            inline
            width="70"
            src={
              fundSource.connBankName === AGGREGATOR.RAZORPAY
                ? razorpayIcon
                : Banks.getIcon(fundSource.ifsc, fundSource.fsDisplayType)
            }
          />
        </Space>
      </header>

      {loading ? null : (
        <section>
          <Space
            justifyContent="space-between"
            alignItems="center"
            className="mb-1"
          >
            <Text color="bodyLight">Available Balance</Text>
            <Link
              to={`/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
                fundSource.fundSourceId
              }/details`}
              onClick={() => Analytics.track(EVENTS.SUMMARY.NAVIGATE_ACCOUNT)}
            >
              <Icon name="top-right-arrow" />
            </Link>
          </Space>
          <Text className="my-1" variant="h28">
            {data?.availableBalance
              ? formatAmount(data?.availableBalance, fundSource.currency)
              : '–'}
          </Text>
          <Space
            justifyContent="space-between"
            alignItems="center"
            className="mt-2"
          >
            <Text color="bodyLight">
              Last updated at{' '}
              {data?.lastUpdated
                ? moment(
                    Region.get() === REGION.IN
                      ? data?.lastUpdated
                      : data?.lastUpdated + 'Z',
                  ).format(FORMATS.TIME)
                : '–'}
            </Text>
            <div
              onClick={() => {
                Analytics.track(EVENTS.SUMMARY.REFRESH_ACCOUNT);
                setFetchCounter((count: number) => count + 1);
              }}
              className="pointer"
            >
              <Icon name="refresh" />
              <Text as="span" color="primary" className="ml-1">
                Refresh
              </Text>
            </div>
          </Space>

          {!_isEmpty(balanceMeta) && <Divider contain className="my-2" />}

          {data?.availableBalance ? (
            Object.keys(balanceMeta).map((key) => (
              <Space
                justifyContent="space-between"
                alignItems="center"
                className="mb-1"
                key={key}
              >
                <Text variant="b12" color="bodyLight">
                  {key}
                </Text>
                <span>{_get(balanceMeta, [key], '–')}</span>
              </Space>
            ))
          ) : (
            <Text color="warning">
              Bank is currently unable to update us the account balance details.
              Please try again after some time.
            </Text>
          )}
        </section>
      )}
    </StyledPaper>
  );
};

FundSourceBalanceCard.propTypes = {
  fundSource: PropTypes.object.isRequired,
  downtimes: PropTypes.array.isRequired,
};

const mapStateToProps = ({ downtimes }: { downtimes: AnyObject[] }) => ({
  downtimes,
});

const withConnect = connect(mapStateToProps);

export default withErrorBoundary(withConnect(FundSourceBalanceCard));
