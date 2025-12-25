import styled from 'styled-components';
import { Space, FloatingDropdown } from '@cashfree-intl/coherent';

export const StyledHeader = styled(Space)`
  width: 100%;
  background: ${props => props.theme.COLORS.white};
  border: 1px solid ${props => props.theme.COLORS.bg};
`;

export const VerticalDivider = styled.div`
  border-left: 1px solid ${props => props.theme.COLORS.bodyLight};
  height: ${props => props.height}px;
`;

export const StyledSaveDropdown = styled(FloatingDropdown)`
  &.ui.dropdown {
    & > .visible.menu.transition {
      margin-top: 8px;
    }
  }
`;
