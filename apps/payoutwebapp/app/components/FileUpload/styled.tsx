import styled from 'styled-components';
import { Space } from '@cashfree-intl/coherent';

// Types
import type { StyledProps } from './types';

const getBorderStyles = (props: StyledProps & { $error: string }) =>
  `border: 1px dashed ${
    props.$error ? props.theme.COLORS.danger : props.theme.COLORS.placeholder
  };`;

export const StyledUpload = styled(Space)`
  border-radius: 8px;
  background-color: ${(props) => props.theme.COLORS.bgLight};
  ${getBorderStyles}
`;
