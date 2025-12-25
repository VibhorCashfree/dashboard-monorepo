import styled from 'styled-components';
import { Dropdown, Icon } from '@cashfree-intl/coherent';

export const StyledDropdown = styled(Dropdown)`
  &.ui.dropdown {
    max-width: ${props => props.$maxWidth || 400}px;

    > input.search {
      inset: 0;
    }

    > svg {
      position: absolute;
      padding-top: 3px;
      right: 1rem;
      z-index: 2;
    }

    > i.icon {
      margin: 0 !important;
      top: 1px !important;
    }
  }
`;

export const StyledIcon = styled(Icon)`
  height: 0.75rem;
`;
