import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Paper, Space, Text } from '@cashfree-intl/coherent';

// Helpers
import { formattedDate } from 'helpers/common';

// Utils
import { formatAmount } from 'utils/common';

// Components
import Icon from 'components/Icon';

const LastRechargeCard = ({ data, enableLink = false }) => (
  <Paper style={{ width: 327 }}>
    <Space justifyContent="space-between" alignItems="center" className="mb-1">
      <Text color="bodyLight" className="m-0">
        Last Recharge
      </Text>

      {enableLink ? (
        <Link to="/accounts/home">
          <Icon name="top-right-arrow" />
        </Link>
      ) : (
        <Link
          className="link"
          to="/accounts/statement?status=BANK_TRANSFER,PG_INSTANT_SETTLEMENT,PG_SETTLEMENT,AUTOCOLLECT_SETTLEMENT"
        >
          View All
        </Link>
      )}
    </Space>
    <Text className="mb-1" variant="h28">
      {formatAmount(data.amount)}
    </Text>
    {!data.error && (
      <>
        <Text variant="p14" className="m-0 mt-2">
          <Text as="span" color="bodyLight">
            UTR -{' '}
          </Text>{' '}
          {data.utr}
        </Text>
        <Text variant="b12" color="bodyLight" className="mt-1">
          {formattedDate(data.depositTime)}
        </Text>
      </>
    )}
  </Paper>
);

LastRechargeCard.propTypes = {
  data: PropTypes.object,
  enableLink: PropTypes.bool,
};

export default LastRechargeCard;
