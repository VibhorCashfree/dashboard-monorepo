import styled from 'styled-components';
import { Text, Space } from '@cashfree-intl/coherent';

export const StyledEmailText = styled(Text)`
  margin-left: 2px;
`;

export const StyledAlertBanner = styled(Space)`
  background-color: rgba(214, 131, 9, 0.1);

  & svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`;
