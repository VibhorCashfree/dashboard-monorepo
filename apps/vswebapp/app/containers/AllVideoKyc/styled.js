import styled from 'styled-components';
import { Space, Text, Modal } from '@cashfree-intl/coherent';

export const StyledPreviewModal = styled(Modal)`
  &.ui.modal {
    right: 0px;
    top: 0px;
    height: 100vh;
    margin: 0px !important;
    border-radius: 0px;
    overflow-y: hidden;
    width: 424px;
  }
`;

export const StyledHeader = styled(Space)`
  padding: 16px 32px 16px 32px;
  box-shadow: 0px 1px 4px 0px #13095129;
`;

export const StyledLabel = styled.div`
  border-radius: 2px;
  background: ${props => props.theme.COLORS.placeholder};
  padding: 2px 8px;
`;

export const StyledFooter = styled(Space)`
  padding: 24px 32px;
  box-shadow: 0px -1px 4px 0px #1309511f;
  position: absolute;
  bottom: 0px;
  background: ${props => props.theme.COLORS.white};
`;

export const StyledInfo = styled(Space)`
  background: #d9e7f2;
  padding: 8px 16px;
  border-radius: 8px 8px 0px 0px;
`;

export const StyledTextItalic = styled(Text)`
  font-style: italic;
`;
