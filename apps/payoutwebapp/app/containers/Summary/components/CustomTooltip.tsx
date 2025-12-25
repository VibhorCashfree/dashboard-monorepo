import React from 'react';
import { Paper, Text, Divider } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Utils
import { formatAmount } from 'utils/common';

// Constants
import { STATUS, LABEL_BY_STATUS } from 'constants/status';

// Styled
import { FlexGrid } from 'styled/common';
import { StyledColorDot, StyledTooltipInfo } from '../styled';

// Types
import type { CustomTooltipProps } from '../types';

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload, active }) => {
  if (!(active && payload)) {
    return null;
  }

  const xLabel: string = _get(payload, '[0].payload.name', '');

  return (
    <Paper className="custom-tooltip p-2">
      <Text variant="b12" color="bodyLight">
        {xLabel}
      </Text>
      <Divider className="mt-1" />
      <FlexGrid cols={2} wrap>
        {payload
          .filter((info) => info.value)
          .map((info) => (
            <StyledTooltipInfo key={info.name}>
              <StyledColorDot $color={info.color} />
              <div className="details">
                <div className="title">
                  {LABEL_BY_STATUS[info.name as STATUS]}
                </div>
                <div className="amount-value">
                  {formatAmount(info.payload.amount[info.name])}
                </div>
                <div className="count-value">
                  {info.payload.count[info.name]}
                </div>
              </div>
            </StyledTooltipInfo>
          ))}
      </FlexGrid>
    </Paper>
  );
};

export default withErrorBoundary(CustomTooltip);
