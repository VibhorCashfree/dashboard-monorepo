import styled, { css } from 'styled-components';
import {
  Button,
  Dropdown,
  TabPane,
  Space,
  Text,
} from '@cashfree-intl/coherent';

// Styled
import { BtnContainer } from 'styled/common';

export const StyledHr = styled.hr`
  margin: 0 -32px;
  color: ${props => props.theme.COLORS.bg};
  background: ${props => props.theme.COLORS.bg};
  height: 1px;
  border-width: 0;
`;

export const StyledButton = styled(Button)`
  padding: 11px 12px;
`;

export const StyleDropdown = styled(Dropdown)`
  &.ui.dropdown {
    max-width: 320px;
    border: 1px solid ${props => props.theme.COLORS.disabled};
    display: flex;

    &.search {
      & > .menu.transition {
        max-width: 320px;
        width: 320px;
      }
    }
  }
`;

export const StyledTabPane = styled(TabPane)`
  &.ui.segment.active.tab {
    padding: 26px 0px;
  }
`;

export const StyleSpace = styled(Space)`
  border-top: 1px solid ${props => props.theme.COLORS.bg};

  ${props =>
    props.first &&
    css`
      margin-top: 16px;
      border-top: none;
    `}
`;

export const StyledBtnContainer = styled(BtnContainer)`
  border-top: 1px solid ${props => props.theme.COLORS.bg};
`;

export const StyledTextWithBg = styled(Text)`
  padding: 2px 6px;
  background: ${props => props.theme.COLORS.warning}20;
  margin-right: 8px;
`;

export const StyledLabel = styled.div`
  border-radius: 2px;
  background: ${props => props.theme.COLORS.placeholder};
  padding: 2px 8px;
`;

export const StyledFooter = styled(Space)`
  border-top: 1px solid ${props => props.theme.COLORS.disabled};
`;

export const StyledAccount = styled(Space)`
  padding: 16px 24px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.COLORS.bg};

  ${props =>
    props.static &&
    css`
      background-color: ${props => props.theme.COLORS.bgLight};
      border: 1px solid ${props => props.theme.COLORS.disabled};
    `}

  ${props =>
    props.selected &&
    css`
      border: 1px solid ${props => props.theme.COLORS.primary};
    `}
`;

export const StyledAlert = styled.div`
  background-color: #fbf3e6;
  padding: 10px 16px;
  border-radius: 4px;
`;

export const StyledExpiry = styled(Text)`
  background-color: ${props => props.theme.COLORS.danger}33;
  padding: 2px 8px;
  border: 1px solid ${props => props.theme.COLORS.danger};
  border-radius: 4px;
`;

export const StyledHeight = styled.div`
  height: 480px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 4px;
  }
`;

export const StyledRequest = styled(Text)`
  padding: 2px 6px;
  border-radius: 2px;
  background: #f9ecda;
`;

export const StyledMessage = styled(Text)`
  padding: 16px 24px;
  background: ${props => props.theme.COLORS.F9F5FF};
  border-radius: 0px 0px 8px 8px;
`;

export const StyledDetail = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  align-items: center;

  > div:nth-child(1) {
    flex: ${props => (props.singleRow ? 2.2 : 5)};
    text-align: left;
  }

  > div:nth-child(2) {
    flex: ${props => (props.singleRow ? 9 : 7)};
    text-align: left;
  }
`;
