import styled from 'styled-components';
import { Text, Paper, Space } from '@cashfree-intl/coherent';

export const StyledCard = styled(Paper)`
  width: 100%;
  padding-top: 0;

  & > div:first-child {
    padding-top: 1.5rem;
    cursor: pointer;
  }
`;

export const StyledText = styled(Text)`
  text-transform: capitalize;
`;

export const StyledChildrenContainer = styled(Space)`
  position: relative;
`;
