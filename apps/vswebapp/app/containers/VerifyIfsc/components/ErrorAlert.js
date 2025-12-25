import React from 'react';
import { Text, Image } from '@cashfree-intl/coherent';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { Divider, BtnContainer } from 'styled/common';

const ErrorAlert = () => (
  <>
    <Divider contain />
    <BtnContainer textAlign="center">
      <Image inline src={getAlertIcon('info')} />
      <Text variant="h20" className="mt-2">
        IFSC is Invalid
      </Text>
    </BtnContainer>
  </>
);

export default ErrorAlert;
