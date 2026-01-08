import React from 'react';
import { PhoneLabeledInput } from '@dashboard-monorepo/shared';

// Constants
import { PHONE_LABEL } from 'constants/common';

// Utils
import Region from 'utils/region';

const PayoutPhoneLabeledInput = (props: any) => {
  const region = Region.get();

  const label = PHONE_LABEL[region];

  return <PhoneLabeledInput label={label} {...props} />;
};

export default PayoutPhoneLabeledInput;
