import React from 'react';
import { InputWithAction } from '@cashfree-intl/coherent';

// Icons
import calendarIcon from 'images/calendar.svg';

// Styled
import { StyledImage } from './styled';

const CalendarIconedInput = props => (
  <InputWithAction
    {...props}
    icon={<StyledImage src={calendarIcon} />}
    style={{ borderLeft: '1px solid #A6A7B0' }}
    label={null}
  />
);

export default CalendarIconedInput;
