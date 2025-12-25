import styled from 'styled-components';

// Utils
import { getStatusColor } from 'components/StatusLabel/utils';

export const StyledNameMatchLabel = styled.span`
  color: ${props => getStatusColor(props.$result, props.theme.COLORS)};
  font-size: 0.75rem;
  display: inline-block;
  background: ${props =>
    `${getStatusColor(props.$result, props.theme.COLORS)}29`};
  padding: 2px 6px;
  line-height: 16px;
`;
