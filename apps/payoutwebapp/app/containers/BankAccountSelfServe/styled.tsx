import styled from 'styled-components';
import { RadioButton, ModalContent } from '@cashfree-intl/coherent';

export const StyledRadioButton = styled(RadioButton)`
  label {
    color: ${(props) => props.theme.COLORS.body} !important;
  }
`;

export const StyledList = styled.div<{ children: React.ReactNode }>`
  background: ${(props) => props.theme.COLORS.white};
  padding: 0.5rem 1.5rem;
  border-radius: 6px;

  > div {
    padding: 1rem 0;

    &:not(:last-child) {
      border-bottom: 1px solid ${(props) => props.theme.COLORS.bg};
    }
  }
`;

export const StyledModalContent = styled(ModalContent)`
  padding: 1rem !important;
`;

export const StyledCard = styled.div`
  position: relative;
  top: -24px;
  border-radius: 10px;
  width: 416px;
  background: white;
  left: 16px;
  box-shadow: rgba(43, 45, 66, 0.14) 0px 3px 10px;
`;
