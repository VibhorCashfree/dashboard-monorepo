import styled from 'styled-components';
import { Modal } from '@cashfree-intl/coherent';

export const StyledDeleteModal = styled(Modal)`
  p {
    width: 330px;
    margin: 0 auto;

    span {
      font-family: ${(props) => props.theme.FONTS.semi_bold};
    }
  }
`;
