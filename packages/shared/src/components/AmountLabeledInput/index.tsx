import React from 'react';
import { InputWithAction } from '@cashfree-intl/coherent';

export interface AmountLabeledInputProps {
  label: string;
  name: string;
  [key: string]: any;
}

const AmountLabeledInput: React.FC<AmountLabeledInputProps> = ({ label, name, ...props }) => (
  // @ts-ignore
  <InputWithAction label={label} name={name} {...props} />
);

export default AmountLabeledInput;
