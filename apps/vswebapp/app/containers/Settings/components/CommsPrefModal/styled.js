import styled from 'styled-components';
import { Modal, Label, ModalContent } from '@cashfree-intl/coherent';

export const StyledModal = styled(Modal)`
  width: 620px !important;
`;

export const StyledLabel = styled(Label)`
  color: ${({ theme }) => theme.COLORS.white} !important;
  background-color: ${({ theme }) => theme.COLORS.placeholder} !important;
  line-height: 18px !important;
`;

export const StyledModalContent = styled(ModalContent)`
  ${({ $activeStep }) => {
    return $activeStep === 2 ? `padding: 0 !important` : null;
  }}
`;
