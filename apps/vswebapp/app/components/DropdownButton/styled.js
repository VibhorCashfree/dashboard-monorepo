import styled from 'styled-components';
import { Dropdown, DropdownMenu, DropdownItem } from '@cashfree-intl/coherent';

export const StyledDropdown = styled(Dropdown)`
  height: 40px;
`;

export const StyledDropdownMenu = styled(DropdownMenu)`
  width: 100%;
`;

export const StyledDropdownItem = styled(DropdownItem)`
  &&&.item {
    padding: 0.5rem 1rem !important;
  }
`;
