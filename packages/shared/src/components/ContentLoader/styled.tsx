import styled from 'styled-components';

export const StyledDimmable = styled.div<{ dimmed?: boolean }>`
  position: relative;
  ${(props) => props.dimmed && 'opacity: 0.5; pointer-events: none;'}
`;
