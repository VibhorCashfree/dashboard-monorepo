import React from 'react';
import { InputWithAction } from '@cashfree-intl/coherent';

// Constants
import { PHONE_LABEL } from 'constants/common';

// Utils
import Region from 'utils/region';

const PhoneLabeledInput = (props: AnyObject) => {
  const region = Region.get();

  const label = PHONE_LABEL[region];

  return <InputWithAction label={label} {...props} />;
};

export default PhoneLabeledInput;
