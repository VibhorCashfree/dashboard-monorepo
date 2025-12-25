import styled from 'styled-components';
import { Modal } from '@cashfree-intl/coherent';

export const StyledAlertModal = styled(Modal)`
  &.ui.modal {
    width: 680px;
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
