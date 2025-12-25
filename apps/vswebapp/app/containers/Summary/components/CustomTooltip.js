import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@cashfree-intl/coherent';

// Styled
import { FlexGrid } from 'styled/common';
import { StyledColorDot, StyledTooltipInfo } from '../styled';

const CustomTooltip = ({ payload, active }) => {
  if (!(active && payload)) {
    return null;
  }

  return (
    <Paper className="custom-tooltip p-2">
      <FlexGrid cols={2} wrap>
        {payload.map(info => (
          <StyledTooltipInfo key={info.name}>
            <StyledColorDot $color={info.color} />
            <div className="details">
              <div className="title">{info.name}</div>
              <div className="count-value">{info.payload.count[info.name]}</div>
            </div>
          </StyledTooltipInfo>
        ))}
      </FlexGrid>
    </Paper>
  );
};

CustomTooltip.propTypes = {
  payload: PropTypes.array,
  active: PropTypes.bool,
};

export default CustomTooltip;
