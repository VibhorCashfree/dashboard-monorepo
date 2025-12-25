import React from 'react';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Styled
import { StyledDateSelect } from '../styled';

// Types
import type { TriggerRangeProps } from '../types';

const TriggerRange: React.FC<TriggerRangeProps> = ({
  open,
  currentDate,
  dateValue,
  options,
  ...props
}) => (
  <StyledDateSelect
    label="Date Range"
    options={options}
    value={dateValue.displayText}
    icon={open ? 'chevron up' : 'chevron down'}
    placeholder={`Today (${currentDate})`}
    {...props}
  />
);

export default withErrorBoundary(TriggerRange);
