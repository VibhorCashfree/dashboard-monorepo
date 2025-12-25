import styled from 'styled-components';
import { Image } from '@cashfree-intl/coherent';

const getSizes = size => {
  switch (size) {
    case 'md':
      return `width: 32px; height: 32px;`;
    default:
      return `width: 56px; height: 56px;`;
  }
};

export const ThirdPartyContainer = styled.div`
${props => getSizes(props.size)}
  background-color: ${({ theme }) => theme.COLORS.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);

  width: 56px;
  height: 56px;
  position: relative;
  overflow: hidden;
`;

export const StyledContainer = styled.div`
  /* background-color: ${props => props.theme.COLORS.white};
  width: 96px;
  height: 32px;
  border: 0.5px solid #e6e5e8; */
`;

export const StyledImage = styled(Image)`
  max-width: 96px;
  max-height: 32px;
`;
