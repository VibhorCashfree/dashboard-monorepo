import styled from 'styled-components';
import { Modal, Text } from '@cashfree-intl/coherent';

export const StyledAlertModal = styled(Modal)`
  &.ui.modal {
    width: 584px;
    padding: 32px;
  }
  .content {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  p {
    width: 330px;
    margin: 0 auto;
  }
`;
export const StyledMsg = styled.div`
  background-color: ${props => props.theme.COLORS.primary};
  border-radius: 4px;
  padding: 8px;
`;

export const StyledScore = styled(Text)`
  background: ${({ theme }) => theme.COLORS.disabled};
  padding: 2px 6px;
  border-radius: 2px;
`;
