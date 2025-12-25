import { Accordion, Paper } from '@cashfree-intl/coherent';
import styled from 'styled-components';

export const StyledPaper = styled(Paper)`
  padding: 20px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.COLORS.bg};
  cursor: pointer;
`;

export const StyledAccordion = styled(Accordion)`
  margin-bottom: 16px;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid rgb(230, 233, 238);
`;

export const StyledAccordionContent = styled.div`
  overflow: hidden;
  height: ${props => (props.active ? 'auto' : '0')};
  opacity: ${props => (props.active ? '1' : '0')};
  transition: height 0.6s ease-in-out, opacity 0.6s ease-in-out;
`;
