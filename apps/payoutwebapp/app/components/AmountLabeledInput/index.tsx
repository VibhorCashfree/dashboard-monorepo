import React from 'react';
import _get from 'lodash/get';
import { AmountLabeledInput } from '@dashboard-monorepo/shared';

// Utils
import { getCurrencySymbol } from 'utils/common';

type Props = {
  controlProps?: AnyObject;
  name: string;
};

const PayoutAmountLabeledInput = (props: Props) => {
  let label;

  if (props.controlProps) {
    const currency = _get(props, 'controlProps.currency');

    if (currency) {
      label = getCurrencySymbol(currency);
    } else {
      label = ' ';
    }
  } else {
    label = getCurrencySymbol();
  }

  return <AmountLabeledInput label={label} {...props} />;
};

export default PayoutAmountLabeledInput;
