import styled from 'styled-components';
import {
  Space,
  Button,
  Text,
  Accordion,
  Dropdown,
  Modal,
} from '@cashfree-intl/coherent';

// constants
import { BLOCK_COLOR_MAPPING } from './constants';

export const StyledWorkFlow = styled(Space)`
  flex: 3 1 0;
`;

export const StyledConfig = styled(Space)`
  flex: 0 1 392px;
  background: white;
`;

export const StyledInfo = styled(Space)`
  border: 1px dotted ${props => props.theme.COLORS.disabled};
  background-color: ${props => props.theme.COLORS.bgLight};
  border-radius: 8px;
  margin: 24px;
  height: calc(100% - 116px);
`;

export const StyledPreview = styled(Button)`
  border: 1px solid ${props => props.theme.COLORS.selected};
  background: white;
  margin-right: 8px;
`;

export const StyledTitle = styled.div`
  background: ${props => props.theme.COLORS.bg};
  border-radius: 0px, 0px, 200px, 200px;
`;

export const StyledContainer = styled.div`
  border-radius: 8px;
  border: 1px dashed ${props => props.theme.COLORS.placeholder};
  padding: 16px;
`;

export const StyledStart = styled.div`
  border-radius: 8px;
  border: 1px solid ${props => props.theme.COLORS.primary};
  padding: 16px 24px;
  background: ${props => props.theme.COLORS.selected};
  // width: 75px;
  width: 205px;
`;

export const StyledEnd = styled.div`
  border-radius: 8px;
  border: 1px solid ${props => props.theme.COLORS.success};
  padding: 16px 24px;
  background: #d9f1e0;
  // width: 75px;
  width: 205px;
`;

export const StyledScreen = styled.div`
  border-radius: 8px;
  padding: 12px 16px 16px;
  background: ${({ theme, selected }) =>
    selected ? theme.COLORS.selected : '#fff'};
  width: 239px;
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.COLORS.primary : theme.COLORS.placeholder};
`;

export const StyledText = styled(Text)`
  letter-spacing: 2px;
`;

export const StyledTab = styled(Space)`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.placeholder};
  background: ${({ theme }) => theme.COLORS.white};
`;

export const StyledBlock = styled(Space)`
  padding: 12px 16px 16px;
  border-radius: 8px;
  border: 1px dashed
    ${({ block, theme }) =>
      BLOCK_COLOR_MAPPING[block]?.border ?? theme.COLORS.placeholder};
  background: ${({ block, theme }) =>
    BLOCK_COLOR_MAPPING[block]?.background ?? theme.COLORS.white};

  &:hover {
    border: 1px solid ${({ theme }) => theme.COLORS.primary};
    background: rgb(241 236 250);
  }
`;

export const StyledOR = styled(Space)`
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  width: 32px;
  height: 20px;
  position: absolute;
  border-radius: 20px;
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.COLORS.primary : theme.COLORS.placeholder};
  background: ${({ theme, selected }) =>
    selected ? theme.COLORS.selected : theme.COLORS.bg};
`;

export const StyledPreviewOR = styled(StyledOR)`
  border: 1px solid ${({ theme }) => theme.COLORS.bg};
`;

export const OrDivider = styled.div`
  background: ${({ theme, selected }) =>
    selected ? theme.COLORS.primary : theme.COLORS.placeholder};
  height: 1px;
  margin: ${props => (props.noMargin ? 0 : '1.5rem 0')};
  width: calc(100% + 2rem);
`;

export const StyledPreviewOrDivider = styled(OrDivider)`
  width: 80%;
  background: ${({ theme }) => theme.COLORS.bg};
`;

export const StyledHeader = styled(Space)`
  padding: 14px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.disabled};
  background: ${({ theme }) => theme.COLORS.white};
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.04);
`;

export const ParentAccordion = styled(Accordion)`
  padding: 24px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.disabled};
  width: 100%;

  &.ui.accordion {
    .title {
      padding: 0px;
    }

    div.content.active {
      padding: 20px 0 0 !important;
    }
  }
`;

export const ParentAccordionTitle = styled(Accordion.Title)``;

export const StyledAddNewButton = styled(Button)`
  border-radius: 4px;
  border: 1px dashed
    ${({ disabled, theme }) =>
      disabled ? theme.COLORS.placeholder : theme.COLORS.primary};
  background: ${({ disabled, theme }) =>
    disabled ? theme.COLORS.hover : theme.COLORS.selected};
  color: ${({ disabled, theme }) =>
    disabled ? theme.COLORS.placeholder : theme.COLORS.primary};
`;

export const ChildAccordion = styled(Accordion)`
  &.ui.accordion {
    margin: 0px;
    margin-bottom: 20px;
    padding: 20px;

    .title {
      padding: 0;
    }

    div.content.active {
      padding: 0px !important;
    }
  }

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.disabled};
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.04);
`;

export const ConditionalContainer = styled(Space)`
  ${({ theme, showContainer }) =>
    showContainer &&
    `
  border-radius: 6px;
  padding: 16px;
  border: 1px solid ${theme.COLORS.disabled};
  background: ${theme.COLORS.bgLight};
  `}
`;

export const StyledDropdown = styled(Dropdown)`
  &.ui.selection.dropdown {
    min-width: ${({ minWidth }) => minWidth}px;
  }
`;

export const StyledlogicInput = styled(Space)`
  width: 109px;
  padding: 4px;
  gap: 2px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.COLORS.disabled};
  background: ${props => props.theme.COLORS.white};
`;

export const StyledOperator = styled(Space)`
  width: 53px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: ${({ selected, theme }) =>
    selected ? theme.COLORS.primary : theme.COLORS.white};
  ${({ selected }) =>
    selected &&
    `
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);
    `}
`;

export const StyledElseEdge = styled(Space)`
  padding: 8px 16px;
  border-radius: 24px;
  border: 1px solid ${props => props.theme.COLORS.placeholder};
  background: ${props => props.theme.COLORS.bgLight};
`;

export const StyledConditionEdge = styled(Space)`
  padding: 8px 16px;
  border-radius: 24px;
  border: 1px solid ${props => props.$border};
  background: ${props => props.$background};
`;

export const StyledPreviewModal = styled(Modal)`
  &.ui.modal {
    right: 0px;
    top: 0px;
    height: 100%;
    margin: 0px !important;
    padding: 32px;
    border-radius: 0px;
  }
`;

export const StyledCustomerPreview = styled(Space)`
  width: 127px;
  border-radius: 4px;
  border: 1px solid rgba(33, 43, 54, 0.25);
  background: ${props => props.theme.COLORS.white};
  padding: 5px 15px;
`;

export const StyledCarousel = styled(Space)`
  display: flex;
  padding: 4px 8px;
  border-radius: 24px;
  background: ${props => props.theme.COLORS.primary};
`;

export const StyledRightConfig = styled(Space)`
  overflow-y: scroll;
  height: calc(100% - 117px);
  ::-webkit-scrollbar {
    width: 4px;
  }
`;

export const StyledMessage = styled(Space)`
  padding: 16px;
  background: ${props => props.theme.COLORS.white};
`;

export const PreviewAccordion = styled(Accordion)`
  border-radius: 6px;
  border: 1px solid ${props => props.theme.COLORS.selected};
  background: ${props => props.theme.COLORS.white};
  padding: 8px;
  margin: 8px;
`;

export const StyledDefaultContainer = styled(Space)`
  padding: 30px 150px;
  height: calc(100% - 66px);
  overflow-y: scroll;
`;

export const StyledTemplate = styled(Space)`
  height: 294px;
  padding: 24px 16px;
  margin: 16px;
  background: ${props => props.theme.COLORS.white};
  width: 225px;
  border-radius: 12px;
  border: 1px solid #e5e9eb;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12);
  }
`;

export const StyledTemplateBg = styled(Space)`
  background: ${props => props.theme.COLORS.bgLight};
  height: 116px;
`;

export const StyledDescription = styled(Text)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SelectModalHeader = styled(Space)`
  padding: 16px 32px;
  box-shadow: -4px 0px 12px rgba(0, 0, 0, 0.12);
`;

export const SelectModalContent = styled(Space)`
  padding: 24px 32px;
  overflow-y: scroll;
  height: calc(100% - 110px);
`;

export const StyledNote = styled(Space)`
  border-radius: 8px;
  background: rgba(214, 131, 9, 0.1);
  padding: 16px 24px;
`;

export const SelectModalFooter = styled(Space)`
  padding: 16px 32px;
`;
