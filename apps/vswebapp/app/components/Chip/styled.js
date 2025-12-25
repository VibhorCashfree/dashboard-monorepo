import styled from 'styled-components';
import { Space, Text, Cross } from '@cashfree-intl/coherent';

export const StyledSpace = styled(Space)`
  background-color: ${({ $verified, theme }) =>
    $verified ? theme.COLORS.primary : theme.COLORS.disabled};
  border-radius: 24px;
  max-width: ${({ $maxWidth }) => $maxWidth};
  height: 2rem;
`;

export const StyledText = styled(Text)`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ $verified, theme }) =>
    $verified ? theme.COLORS.white : theme.COLORS.body};
`;

export const StyledCross = styled(Cross)`
  stroke: ${({ $verified, theme }) =>
    $verified ? theme.COLORS.white : theme.COLORS.body};
  flex-shrink: 0;
`;
