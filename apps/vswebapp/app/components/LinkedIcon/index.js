import React from 'react';
import { Space, Image } from '@cashfree-intl/coherent';
import { ThirdPartyContainer, StyledImage, StyledContainer } from './styled';

// Images
import CashfreeIcon from 'images/cashfree-mobile.svg';

const LogoConnection = ({ appLogo }) => {
  return (
    <StyledContainer>
      {appLogo ? (
        <StyledImage
          src={
            typeof appLogo === 'string' ? appLogo : URL.createObjectURL(appLogo)
          }
        />
      ) : (
        <StyledImage src={CashfreeIcon} alt="Logo 1" />
      )}
    </StyledContainer>
  );
};

export default LogoConnection;
