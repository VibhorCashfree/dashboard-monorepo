import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Paper, Text } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
// Utils
import { formatAmount } from 'utils/common';

// Styled
import { BtnContainer } from 'styled/common';

const LowBalanceThresholdCard = ({ data }) => (
  <Paper style={{ width: 327 }}>
    <Text color="bodyLight">Low Balance Threshold</Text>
    <Text className="my-1" variant="h28">
      {formatAmount(_get(data, 'lowBalance', 0))}
    </Text>
    <Text variant="b12" color="bodyLight">
      You will be notified via email when your <br /> balance drops below the
      threshold.
    </Text>
    <BtnContainer>
      <Link className="link" to="/settings/set-threshold">
        Set Threshold
      </Link>
    </BtnContainer>
  </Paper>
);

LowBalanceThresholdCard.propTypes = {
  data: PropTypes.object,
};

export default LowBalanceThresholdCard;
