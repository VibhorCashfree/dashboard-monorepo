import styled from 'styled-components';
import { Label, Text, Space } from '@cashfree-intl/coherent';

export const StyledSettings = styled.div`
  padding: 2rem 2rem 2rem 10rem;
  background: ${props => props.theme.COLORS.bgLight};
  min-height: 100%;
`;

export const EmailChips = styled(Label)`
  &.ui.label {
    background: #ebebeb;
    border-radius: 23px;
    font-size: 14px;
    line-height: 17px;
    font-family: ${props => props.theme.FONTS.normal};
    color: #434343;
  }
`;

export const StyledThreshold = styled.div`
  .ui.input.labeled.focus.input {
    * {
      border: none;
    }
    border-radius: 6px;
    border: 1px solid ${props => props.theme.COLORS.primary};
    width: 210px;
  }
`;

export const StyledDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledText = styled(Text)`
  text-transform: capitalize;
`;

export const StyledEmailTabContainer = styled(Space)`
  min-height: 120px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
