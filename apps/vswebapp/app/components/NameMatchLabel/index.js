import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Styled
import { StyledNameMatchLabel } from './styled';

export const NameMatchLabel = ({ score, result, ...props }) => (
  <StyledNameMatchLabel $result={result} {...props}>
    {`${LABEL_BY_STATUS[result]} - ${Math.round(score)}%`}
  </StyledNameMatchLabel>
);

NameMatchLabel.propTypes = {
  score: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
};

export default NameMatchLabel;
