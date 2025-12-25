import React from 'react';
import PropTypes from 'prop-types';

// Styled
import { StyledDateSelect } from '../styled';

const TriggerRange = ({ open, currentDate, dateValue, options, ...props }) => (
  <StyledDateSelect
    label="Date Range"
    options={options}
    value={dateValue.displayText}
    icon={open ? 'chevron up' : 'chevron down'}
    placeholder={`Today (${currentDate})`}
    {...props}
  />
);

TriggerRange.propTypes = {
  open: PropTypes.bool.isRequired,
  currentDate: PropTypes.string.isRequired,
  dateValue: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

export default TriggerRange;
