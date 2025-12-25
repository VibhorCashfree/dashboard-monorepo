import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Space, Text, Image } from '@cashfree-intl/coherent';
import _isEmpty from 'lodash/isEmpty';

// Components
import Icon from 'components/Icon';
import SummaryCard from 'components/SummaryCard';

// Icons
import cashfreeIcon from 'images/cashfree.svg';

// Utils
import { getBalanceMeta } from 'utils/balance';
import { formatAmount } from 'utils/common';

// Styled
import { Divider } from 'styled/common';

export const FundSourceBalanceCard = ({ paymentInstrumentId, balance }) => {
  const balanceMeta = balance.availableBalance ? getBalanceMeta(balance) : {};

  return (
    <SummaryCard>
      <SummaryCard.Header>
        <div>
          <Text color="bodyLight">Payment Instruments ID</Text>
          <Text>{paymentInstrumentId}</Text>
        </div>
        <Image width="70" src={cashfreeIcon} inline />
      </SummaryCard.Header>
      <SummaryCard.Content>
        <Space
          justifyContent="space-between"
          alignItems="center"
          className="mb-1"
        >
          <Text color="bodyLight">Available Balance</Text>
          <Link to="/accounts/home">
            <Icon name="top-right-arrow" />
          </Link>
        </Space>
        <Text className="my-1" variant="h28">
          {balance.availableBalance
            ? formatAmount(balance.availableBalance)
            : '–'}
        </Text>
        {!_isEmpty(balanceMeta) && <Divider contain className="my-2" />}

        {balance.availableBalance ? (
          Object.keys(balanceMeta).map(key => (
            <Space
              justifyContent="space-between"
              alignItems="center"
              className="mb-1"
              key={key}
            >
              <Text variant="b12" color="bodyLight">
                {key}
              </Text>
              <span>{balanceMeta[key]}</span>
            </Space>
          ))
        ) : (
          <Text color="warning">
            Unable to show the balance currently. Refresh after some time.
          </Text>
        )}
      </SummaryCard.Content>
    </SummaryCard>
  );
};

FundSourceBalanceCard.propTypes = {
  paymentInstrumentId: PropTypes.string.isRequired,
  balance: PropTypes.string,
};

const mapStateToProps = ({ availableBalance }) => ({
  balance: availableBalance,
});

const withConnect = connect(mapStateToProps);

export default withConnect(FundSourceBalanceCard);
