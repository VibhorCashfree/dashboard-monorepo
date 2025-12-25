import styled from 'styled-components';
import { Card, Text, Space, Button } from '@cashfree-intl/coherent';

export const DragHandle = styled.div`
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const AnswerText = styled(Text)`
  font-style: italic;
`;

export const StyledCard = styled(Card)`
  &.ui.card {
    width: 100%;
    border-radius: 15px;
    overflow: hidden;
  }
`;

export const CardHeader = styled(Space)`
  padding: 11px 16px;
  border-bottom: 0.5px solid ${props => props.theme.COLORS.placeholder};
`;

export const CardBody = styled(Space)`
  padding: 16px 24px 24px;
  background: #f4f6f9;
  border-radius: 15px;
`;

export const StyledButton = styled(Button)`
  padding: 8px 0px;
`;
