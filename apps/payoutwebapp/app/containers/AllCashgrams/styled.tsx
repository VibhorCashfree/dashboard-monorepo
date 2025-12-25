import styled from 'styled-components';
import { Modal, Paper } from '@cashfree-intl/coherent';

export const StyledSendCashgramModal = styled(Modal)`
  &.ui.modal {
    .ui.checkbox label {
      font-size: 14px;
      color: ${(props) => props.theme.COLORS.bodyLight};
    }
  }
`;

export const StyledPaper = styled(Paper)<{ $selection: boolean }>`
  background-color: ${(props) =>
    props.$selection ? '#fbf9ff' : props.theme.COLORS.white};
  border: 1px solid
    ${(props) => (props.$selection ? '#d1bfee' : props.theme.COLORS.bg)};
  padding: 16px 20px;
`;
