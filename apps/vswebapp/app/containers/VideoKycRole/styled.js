import styled, { css } from 'styled-components';
import {
  Paper,
  Space,
  Text,
  Modal,
  Button,
  Progress,
} from '@cashfree-intl/coherent';

export const StyledSpace = styled(Space)`
  padding: 16px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.COLORS.bg};
  cursor: pointer;
  width: 210px;
`;

export const StyledColorInput = styled.div`
  .ui.input {
    input[type='text'] {
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
  bottom: 50px;
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

export const StyledPreviewModal = styled(Modal)`
  &.ui.modal {
    right: 0px;
    top: 0px;
    height: 100%;
    margin: 0px !important;
    border-radius: 0px;
    overflow-y: hidden;
    width: 379px;
  }
`;

export const StyledTemplateModal = styled(Modal)`
  &.ui.modal {
    right: 0px;
    top: 0px;
    height: 100%;
    margin: 0px !important;
    border-radius: 0px;
    overflow-y: hidden;
    width: 520px;
  }
`;

export const StyledPreviewWrapper = styled(Space)`
  width: 728px;
  background-color: ${props => props.theme.COLORS.bgLight}};
`;

export const StyledPreview = styled.div`
  box-shadow: 0px 0px 8px 4px #0000001f;
  width: 386px;
  height: 530px;
  gap: 0px;
  border-radius: 12px;
  position: relative;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const StyledHeader = styled(Space)`
  padding: 24px 32px 16px 32px;
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

export const StyledPrefHeader = styled(Space)`
  margin-bottom: 12px;
`;

export const StyledCredential = styled(Space)`
  border-radius: 8px;
  border: 1px solid ${props => props.theme.COLORS.selected};
  background: ${props => props.theme.COLORS.F9F5FF};
`;

// Mobile Preview
export const StyledPurpleBg = styled.div`
  padding: 16px;
  background: ${props => props.theme.COLORS.selected};
  width: 100%;
  border-radius: 8px;
`;

export const StyledLinkButton = styled(Button)`
  text-align: left;
  text-decoration: underline;
`;

export const StyledNumBg = styled(Space)`
  width: 24px;
  height: 24px;
  background: ${props => props.theme.COLORS.D9E7F2};
  padding: 2px 8px;
  border-radius: 15px;
`;

export const StyledTakeControl = styled(Space)`
  padding: 16px;
  background: ${props => props.theme.COLORS.D9E7F2};
  width: 100%;
  border-radius: 8px;
`;

export const StyledWrapper = styled.div`
  padding: 24px;
  height: calc(100% - 40px);
  overflow-y: visible;
  ::-webkit-scrollbar {
    width: 2px;
  }
  border-radius: 16px;
  background-color: #fff;
`;

export const StyledTerms = styled(Text)`
  cursor: pointer;
  text-decoration: underline;
  color: ${props => props.theme.COLORS.primary};
`;

export const StyledMobileFooter = styled.div`
  position: fixed;
  bottom: 0px;
  height: 80px;
  background: ${props => props.theme.COLORS.white};
  border-radius: 8px 8px 13px 13px;
  padding: 20px 24px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px -1px 8px 0px;
  width: 100%;
`;

export const StyledStepThree = styled(Space)`
  /* height: calc(100% - 189px); */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 4px;
  }
`;

export const StyledDiv = styled.div`
  box-shadow: 0px 0px 8px 4px #0000001f;
  width: 386px;
  height: 678px;
  gap: 0px;
  border-radius: 12px;
  position: relative;
  background: rgb(239, 229, 255);
`;

export const StyledStepper = styled.div`
  .ui.grid {
    margin: 0 !important;
  }
  .ui.grid > .row {
    padding: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
`;

export const StyledContainer = styled.div`
  background-color: ${props => props.theme.COLORS.white};
  border-radius: 50%;
  width: 56px;
  height: 56px;
  top: -56px;
  display: flex;
  position: relative;
  overflow: hidden;
  border: 0.5px solid #e6e5e8;
`;

export const StyledImage = styled(Image)`
  min-width: 50%;
  min-height: 50%;
  width: auto;
  height: auto;
`;

export const StyledStatusLabel = styled(Space)`
  background: #d9f1e0;
  padding: 10px 8px;
  border-radius: 20px;
  border: 2px solid #02862a;
  color: #02862a;
  font-size: 10px;
  width: 105px;
  height: 20px;
  margin-bottom: 12px;
`;

export const StyledLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    color: #6930ca;
    text-decoration: underline;
  }
`;

export const StyledConsent = styled(Space)`
  background: #f9f9f9;
  border-radius: 6px;
  border: 1px solid #e6e5e8;
  padding: 8px;
  font-weight: 500;
`;

export const StyledButton = styled(Button)`
  border-radius: 24px;
`;

export const StyledPreviewFooter = styled.div`
  position: fixed;
  bottom: 0;
  background: #f4f6f9;
  height: 40px;
  border-radius: 8px 8px 20px 20px;
  padding: 12px;
  width: 100%;
`;

export const ThirdStepWrapper = styled.div`
  box-shadow: 0px 0px 8px 4px #0000001f;
  width: 386px;
  height: 530px;
  gap: 0px;
  border-radius: 12px;
  position: relative;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const ThirdStepInnerWrapper = styled.div`
  padding: 24px;
  position: absolute;
  top: 0;
  height: 455px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
`;

export const StyledProgress = styled(Progress)`
  width: 130px;

  &.ui.progress {
    margin: 0px;
    height: 8px;
  }

  &.ui.progress .bar {
    height: 8px;
  }
`;

export const StyledNum = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: ${props => props.theme.COLORS.selected};
  border-radius: 15px;
  margin-top: 3px;
`;

export const StyledInfo = styled(Space)`
  background: #d9e7f2;
  padding: 8px 16px;
  border-radius: 8px 8px 0px 0px;
`;

export const StyledChevron = styled(Space)`
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.COLORS.primary};
  border-radius: 25px;
`;
