import styled from 'styled-components';
import { Modal } from '@cashfree-intl/coherent';

export const StyledDeleteModal = styled(Modal)`
  p {
    width: 330px;
    margin: 0 auto;

    span {
      font-family: ${props => props.theme.FONTS.semi_bold};
    }
  }
`;

export const CodeWrapper = styled.div`
  padding: 0 1rem;
  background: rgba(244, 246, 249, 0.7);
  border: 1px solid ${props => props.theme.COLORS.placeholder};
  border-radius: 8px;
`;
