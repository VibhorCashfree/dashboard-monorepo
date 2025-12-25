import styled from 'styled-components';
import { Space, Text } from '@cashfree-intl/coherent';

export const StyledVerticalDivider = styled(Space)`
  width: 1px;
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.bg};
  margin: 0 8px;
`;

export const ColoredText = styled(Text)`
  color: ${({ color }) => color};
`;
