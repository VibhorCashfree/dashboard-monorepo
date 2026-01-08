import React from 'react';
import { CalendarIconedInput } from '@dashboard-monorepo/shared';

// Icons
import calendarIcon from 'images/calendar.svg';

// Styled
import { StyledImage } from './styled';

const PayoutCalendarIconedInput = (props: any) => (
  <CalendarIconedInput
    {...props}
    icon={<StyledImage src={calendarIcon} />}
  />
);

export default PayoutCalendarIconedInput;
