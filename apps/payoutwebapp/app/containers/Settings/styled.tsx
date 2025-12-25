import styled from 'styled-components';
import { Label } from '@cashfree-intl/coherent';

export const EmailChips = styled(Label)`
  &.ui.label {
    background-color: ${(props) => props.theme.COLORS.bg};
    border-radius: 23px;
    font-size: 14px;
    line-height: 17px;
    font-family: ${(props) => props.theme.FONTS.normal};
    color: ${(props) => props.theme.COLORS.body};
  }
`;

export const StyledThreshold = styled.div`
  .ui.input.labeled.focus.input {
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme.COLORS.primary};
    width: 210px;

    * {
      border: none;
    }
  }
`;

export const StyledTable = styled.table<{
  className?: string;
  children: React.ReactNode;
}>`
  width: 100%;
  text-align: center;
  border: 1px dotted ${(props) => props.theme.COLORS.bodyLight};
  border-collapse: collapse;

  thead {
    font-style: italic;
  }

  th,
  td {
    border: 1px dotted ${(props) => props.theme.COLORS.bodyLight};
    border-collapse: collapse;
  }

  td {
    color: ${(props) => props.theme.COLORS.bodyLight};
  }
`;
