import React from 'react';
import { InputWithAction } from '@cashfree-intl/coherent';

export interface CalendarIconedInputProps {
  icon: React.ReactNode;
  name: string;
  [key: string]: any;
}

const CalendarIconedInput: React.FC<CalendarIconedInputProps> = ({ icon, name, ...props }) => (
  // @ts-ignore
  <InputWithAction
    {...props}
    name={name}
    icon={icon}
    style={{ borderLeft: '1px solid #A6A7B0', ...props.style }}
    label={null}
  />
);

export default CalendarIconedInput;
