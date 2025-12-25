import styled from 'styled-components';

export const StyledSettings = styled.div<{
  className?: string;
  children: React.ReactNode;
}>`
  display: block;
  width: 100%;
  overflow-y: scroll;
`;
