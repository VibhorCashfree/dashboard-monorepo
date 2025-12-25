import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Space, Text } from '@cashfree-intl/coherent';

// Utils
import { formatAmount } from 'utils/common';
import { getBalanceMeta } from 'utils/balance';

// Styled
import { Divider } from 'styled/common';

const AvailableBalanceCard = ({ isWallet, balance }) => {
  const balanceMeta = balance ? getBalanceMeta(balance) : {};
  const availableBalance =
    balance.availableBalance && formatAmount(balance.availableBalance);

  return (
    <Paper style={{ width: 327 }}>
      <Text color="bodyLight" className="mb-1">
        Available Balance
      </Text>

      <Text className="my-1" variant="h28">
        {availableBalance || '–'}
      </Text>
      {isWallet && (
        <Text variant="b12" color="bodyLight">
          (Account Balance - Funds on Hold + Overdraft)
        </Text>
      )}
      <Divider contain />
      <div style={{ minHeight: 100 }}>
        {Object.keys(balanceMeta).map(key => (
          <Space
            justifyContent="space-between"
            alignItems="flex-start"
            className="mb-2"
            key={key}
          >
            <Text variant="b12" color="bodyLight">
              {key}
            </Text>
            <span>{balanceMeta[key]}</span>
          </Space>
        ))}
      </div>
    </Paper>
  );
};

AvailableBalanceCard.propTypes = {
  isWallet: PropTypes.bool.isRequired,
  balance: PropTypes.object.isRequired,
};

export default AvailableBalanceCard;
