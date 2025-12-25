import styled from 'styled-components';
import { Dimmer } from '@cashfree-intl/coherent';

export const StyledDimmer = styled(Dimmer)`
  position: fixed;
  cursor: pointer;
`;

export const StyledDimmable = styled(Dimmer.Dimmable)`
  &.segment {
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 0;

    .ui.inverted.dimmer {
      background-color: rgba(255, 255, 255, 0.95);
    }
  }
`;
