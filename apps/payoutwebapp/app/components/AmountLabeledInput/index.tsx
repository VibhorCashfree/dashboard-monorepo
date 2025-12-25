import React from 'react';
import { InputWithAction } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Utils
import { getCurrencySymbol } from 'utils/common';

type Props = {
  controlProps?: AnyObject;
};

const AmountLabeledInput = (props: Props) => {
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

  return <InputWithAction label={label} {...props} />;
};

export default AmountLabeledInput;
