import React from 'react';
import PropTypes from 'prop-types';
import _startCase from 'lodash/startCase';
import _capitalize from 'lodash/capitalize';
import { CORE_LABEL_BY_STATUS } from '@dashboard-monorepo/shared';

// Constants - merge core with app-specific
import { LABEL_BY_STATUS as APP_LABEL_BY_STATUS } from 'constants/status';

// Styled
import { StyledLabel } from './styled';

const LABEL_BY_STATUS = { ...CORE_LABEL_BY_STATUS, ...APP_LABEL_BY_STATUS };

const StatusLabel = ({ children, ...props }) => (
  <StyledLabel $status={children} {...props}>
    {LABEL_BY_STATUS[children] || _capitalize(_startCase(children))}
  </StyledLabel>
);

StatusLabel.propTypes = {
  children: PropTypes.string.isRequired,
  animation: PropTypes.bool,
  filled: PropTypes.bool,
};

export default StatusLabel;
