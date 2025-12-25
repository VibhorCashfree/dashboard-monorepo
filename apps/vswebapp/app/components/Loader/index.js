import React from 'react';

import { Loader, Theme } from '@cashfree-intl/coherent';

const CustomLoader = props => (
  <Theme>
    <Loader active {...props} />
  </Theme>
);

export default CustomLoader;
