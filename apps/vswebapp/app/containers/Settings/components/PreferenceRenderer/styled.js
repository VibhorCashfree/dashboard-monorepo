import styled from 'styled-components';
import { Space, Text } from '@cashfree-intl/coherent';

export const StyledContainer = styled(Space)`
  width: 100%;
`;

export const StyledRow = styled(Space)`
  width: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.COLORS.neutral}`};
  padding-bottom: 2px;

  & > div:first-child {
    flex: 1;
  }

  & > div:last-child {
    /* flex: 1; */
    min-width: 5rem;
  }
`;

export const StyledPreferenceBox = styled(Space)`
  width: 5rem;
  justify-content: center;
  align-items: center;

  & > div.ui.checkbox {
    height: 17px;
  }

  & > div label {
    padding-left: 1.25714em !important;
  }
`;

export const StyledHeadingText = styled(Text)`
  text-transform: capitalize;
`;

export const StyledChannelText = styled(Text)`
  display: flex;
  align-items: center;
  text-transform: capitalize;
`;

export const StyledDescriptionText = styled(Text)`
  line-height: 15px;
`;
