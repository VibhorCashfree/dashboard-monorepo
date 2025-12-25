import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Text } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Styled
import { BtnContainer } from 'styled/common';

// Utils
import { formatAmount } from 'utils/common';

// Constants
import { CURRENCY } from 'constants/common';

// Types
import type { LowBalanceThresholdCardProps } from '../types';

const LowBalanceThresholdCard: React.FC<LowBalanceThresholdCardProps> = ({
  fundSourceId,
  data,
  currency,
}) => (
  <Paper style={{ width: 327 }}>
    <Text color="bodyLight">Low Balance Threshold</Text>
    <Text className="my-1" variant="h28">
      {formatAmount(data.lowBalance, currency as CURRENCY)}
    </Text>
    <Text variant="b12" color="bodyLight">
      You will be notified via email when your <br /> balance drops below the
      threshold.
    </Text>
    <BtnContainer textAlign="left">
      <Link
        className="link"
        to={`/settings/set-threshold?fundSourceId=${fundSourceId}`}
      >
        Set Threshold
      </Link>
    </BtnContainer>
  </Paper>
);

export default withErrorBoundary(LowBalanceThresholdCard);
