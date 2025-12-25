import styled from 'styled-components';
import { Space } from '@cashfree-intl/coherent';

import mobile from 'images/mobile.svg';

export const StyledUploadFile = styled.div`
  width: 436px;
`;

export const StyledColorPalette = styled(Space)``;

export const StyledInputDiv = styled.div`
  position: relative;
`;

export const StyledChromePicker = styled.div`
  position: absolute;
  z-index: 1;
`;

export const StyledColorInput = styled.div`
  .ui.input {
    input[type='text'] {
      padding-left: 2.5rem;
    }
  }
`;

export const StyledColorBox = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 10px;
  top: 8px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.COLORS.bodyLight};
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
`;

export const StyledMobilePreview = styled(Space)`
  background: #f9fbfc;
  border-radius: 0px 25px 25px;
`;

export const StyledMobileDiv = styled.div`
  background-image: ${`url(${mobile})`};
  height: 560px;
  width: 300px;
  background-repeat: no-repeat;

  button {
    background-color: ${props => props.bgColor};
    color: ${props => props.textColor};
  }
`;

export const StyledTermsAndCond = styled.span`
  color: ${props => props.textColor};
`;

export const StyledHeader = styled(Space)`
  height: 60px;
  background-color: ${props => props.bgColor};
  svg,
  img {
    width: 70px;
    max-height: 40px;
  }
`;

export const StyledProceedDiv = styled.div`
  button {
    background-color: ${props => props.bgColor};
    color: ${props => props.textColor};
  }
`;

export const StyledTermsAndCondDiv = styled.div`
  font-size: 8px;
  line-height: 8px;
`;
