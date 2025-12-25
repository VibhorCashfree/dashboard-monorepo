import styled from 'styled-components';

export const StyledEmptyTableView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 126px;
  background: ${(props) => props.theme.COLORS.white};
  border-radius: 8px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
`;
