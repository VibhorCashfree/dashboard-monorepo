import styled from 'styled-components';

export const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
  background: ${(props) => props.theme.COLORS.bgLight};
`;

export const AlertBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;
