import React from 'react';
import { InputWithAction } from '@cashfree-intl/coherent';

export interface PhoneLabeledInputProps {
  label: string;
  name: string;
  [key: string]: any;
}

const PhoneLabeledInput: React.FC<PhoneLabeledInputProps> = ({ label, name, ...props }) => (
  // @ts-ignore
  <InputWithAction label={label} name={name} {...props} />
);

export default PhoneLabeledInput;
