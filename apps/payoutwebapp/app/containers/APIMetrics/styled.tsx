import styled from 'styled-components';
import { LineChart } from 'recharts';
import { Dropdown } from '@cashfree-intl/coherent';

export const StyledLineChart = styled(LineChart)`
  &.recharts-wrapper {
    width: 100% !important;
  }

  .recharts-surface {
    width: 100% !important;
  }

  .recharts-cartesian-axis-tick tspan {
    font-size: 10px;
  }

  .recharts-default-tooltip {
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.12);
    padding: 1.5rem;
    background: ${(props) => props.theme.COLORS.white};
    border-radius: 8px;
    border: none !important;
  }
`;

export const StyledDropdownMenu = styled(Dropdown.Menu)`
  &.visible.left.menu.transition {
    border-radius: 8px !important;
    box-shadow: 0px 4px 6px rgba(43, 45, 66, 0.12) !important;
    top: calc(100% + 8px);

    .header {
      pointer-events: none;
    }

    .scrolling.menu {
      margin: 0 !important;
      max-width: 310px;
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;
      border-bottom-left-radius: 0.5rem !important;
      border-bottom-right-radius: 0.5rem !important;
      border-top: none;

      .item {
        &:hover {
          background-color: ${(props) => props.theme.COLORS.selected};
        }

        label {
          font-size: 0.875rem;
          color: ${(props) => props.theme.COLORS.body};
        }

        p {
          padding-top: 0.5rem;
          padding-left: 1.5rem;
          white-space: pre-wrap;
          margin: 0;
        }
      }
    }
  }
`;
