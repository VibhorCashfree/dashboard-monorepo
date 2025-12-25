import styled from 'styled-components';

export const StyledVerifyIfsc = styled.div`
  background-color: ${props => props.theme.COLORS.white};
  border: none;
  border-radius: 8px;
  box-shadow: unset;
  padding: 24px;
  max-width: 370px;

  .ui.table,
  .ui.table tr td {
    min-width: 120px;
    vertical-align: top;
  }
`;
