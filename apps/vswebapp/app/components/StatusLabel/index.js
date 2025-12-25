import React from 'react';
import PropTypes from 'prop-types';
import _startCase from 'lodash/startCase';
import _capitalize from 'lodash/capitalize';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Styled
import { StyledLabel } from './styled';

const StatusLabel = ({ children, ...props }) => {
  if (!children) {
    return '–';
  }

  return (
    <StyledLabel $status={children} {...props}>
      {LABEL_BY_STATUS[children] || _capitalize(_startCase(children))}
    </StyledLabel>
  );
};

StatusLabel.propTypes = {
  children: PropTypes.string.isRequired,
  animation: PropTypes.bool,
  filled: PropTypes.bool,
};

export default StatusLabel;
