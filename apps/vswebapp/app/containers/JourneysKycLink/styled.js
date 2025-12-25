import styled, { css } from 'styled-components';
import { Paper, Space, Text } from '@cashfree-intl/coherent';

export const StyledLabel = styled.div`
  border-radius: 2px;
  background: ${props => props.theme.COLORS.placeholder};
  padding: 2px 8px;
`;

export const StyledSpace = styled(Space)`
  padding: 16px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.COLORS.bg};
  cursor: pointer;
  width: 210px;
`;

export const StyledColorInput = styled.div`
  .ui.input {
    input {
      padding-left: 2.5rem;
    }
  }
`;

export const StyledUploadFile = styled.div`
  width: 24.25rem;
`;

export const StyledColorType = styled.div`
  width: 15rem;
`;

export const StyledInputDiv = styled.div`
  position: relative;
`;

export const StyledColorBox = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 10px;
  top: 8px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.COLORS.bodyLight};
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
`;

export const StyledVerificationTypePaper = styled(Paper)`
  width: 24.625rem;
`;

export const StyledInfoText = styled(Text)`
  font-size: 10px;
  line-height: 12px;
`;

export const StyledPreviewPaperDiv = styled.div`
  height: 19.125rem;
  background-color: #edf1f5;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 2px;
  }
`;

export const StyledPreviewPaper = styled(Paper)`
  max-height: 4.375rem;
`;

export const StyledVerificationTypeText = styled(Text)`
  font-size: 10px;
  line-height: 12px;
`;

export const StyledEmptyVerificationSpace = styled(Space)`
  border: 1px dashed ${props => props.theme.COLORS.placeholder};
`;

export const StyledHeaderSpace = styled(Space)`
  background-color: ${props => props.theme.COLORS.focused};
`;

export const StyledStepText = styled.span`
  background-color: ${props => props.theme.COLORS.placeholder};
  opacity: 1;
  padding: 2px 8px;
  border-radius: 2px;
  color: ${props => props.theme.COLORS.white};
  font-size: 14px;
`;

export const StyledLabelDiv = styled.div`
  span {
    font-size: 10px;
  }
`;

export const StyledChromePicker = styled.div`
  position: absolute;
  z-index: 1;
`;

export const StyledDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 25px;
  background-color: ${props => props.theme.COLORS.selected};
  border: 1px solid ${props => props.theme.COLORS.primary};
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      background-color: ${props => props.theme.COLORS.primary};
    `};
`;

export const BoxShadow = styled.div`
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.18);
`;

export const RadioContainer = styled.div`
  border: 1px solid ${props => props.theme.COLORS.primary};
  border-radius: 6px;
`;

export const Tile = styled.div`
  color: ${props =>
    props.active ? props.theme.COLORS.primary : props.theme.COLORS.bodyLight};
  border-radius: 6px;
  min-width: 88px;
  font-size: 14px;
  padding: 11px 16px;
  line-height: 18px;
  cursor: pointer;
  text-align: center;
  border: 1px solid
    ${props =>
      props.active
        ? props.theme.COLORS.primary
        : props.theme.COLORS.placeholder};
  background-color: ${props => props.active && '#EFE5FF'};
  &:hover {
    background-color: #f4effc;
  }
`;
