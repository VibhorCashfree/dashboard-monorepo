import styled from 'styled-components';
import { Embed } from '@cashfree-intl/coherent';

export const StyledEmbed = styled(Embed)`
  border-radius: 8px;
  border: 1px ${(props) => props.theme.COLORS.white}66 solid;
  box-shadow: 0 0 0 6px ${(props) => props.theme.COLORS.white}1a;
`;
