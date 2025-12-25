import styled from 'styled-components';
import { Form } from '@cashfree-intl/coherent';

export const StyledDateSelect = styled(Form.Select)`
  .menu {
    display: none !important;
  }

  .ui.active.dropdown {
    border-bottom-left-radius: 6px !important;
    border-bottom-right-radius: 6px !important;
  }

  .selection.dropdown {
    .icon {
      margin: 0;
      float: right;
      position: relative;
      left: 5px;
      color: ${(props) => props.theme.COLORS.primary};
    }
  }
`;
