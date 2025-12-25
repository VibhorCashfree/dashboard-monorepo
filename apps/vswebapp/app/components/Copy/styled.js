import styled from 'styled-components';

export const StyledCopy = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    border-radius: 50%;
    background: ${props => props.theme.COLORS.hover};
  }
`;
