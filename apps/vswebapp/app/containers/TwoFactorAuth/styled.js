import styled from 'styled-components';
import { Modal, Message, Label } from '@cashfree-intl/coherent';

export const StyledDeleteModal = styled(Modal)`
  p {
    width: 330px;
    margin: 0 auto;

    span {
      font-family: ${props => props.theme.FONTS.semi_bold};
    }
  }
`;

export const StyledMessage = styled(Message)`
  &.ui.message {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    color: #027123;
    background: #00a33133;
    border-radius: 6px;
    box-shadow: none;
  }
`;

export const LabelWrapper = styled.div`
  border: 1px solid lightgrey;
  border-radius: 6px;
  padding: 0.5rem;
  margin: 0.5rem 0;

  .ui.label {
    background: ${props => props.theme.COLORS.bg};
    font-size: 0.875rem;
    font-family: ${props => props.theme.FONTS.normal};
    border-radius: 0;
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.COLORS.body};
    border-radius: 2px;

    span {
      font-size: 0.75rem;
    }
  }

  input {
    border: 0;
    outline: none;
    width: 100%;
    line-height: 20px;
  }
`;

export const WarningLabel = styled(Label)`
  background-color: #ffebee !important;
  border-color: #ffcdd2 !important;
  color: #c62828 !important;
`;
