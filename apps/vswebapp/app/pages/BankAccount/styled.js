import styled from 'styled-components';
import { Text } from '@cashfree-intl/coherent';

export const StyledLink = styled(Text)`
  cursor: pointer;
  text-decoration: underline;
  color: ${props => props.theme.COLORS.primary};
`;
