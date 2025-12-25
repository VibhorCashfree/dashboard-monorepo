import styled from 'styled-components';
import { Space } from '@cashfree-intl/coherent';

export const StyledSidebar = styled(Space)`
  background: ${(props) => props.theme.COLORS.white};
  width: 304px;
  height: 100vh;
  padding-top: 16px;
  padding-left: 32px;
  position: fixed;
`;

export const MainContent = styled.div`
  width: calc(100% - 304px);
  height: calc(100vh - 120px);
  position: relative;
  left: 304px;
  overflow-y: scroll;
  padding: 1.5rem 1.5rem 4rem;
`;

export const StyledHeader = styled(Space)`
  width: 100%;
  background: ${(props) => props.theme.COLORS.white};
  border: 1px solid ${(props) => props.theme.COLORS.bg};
`;

export const StyledFooter = styled(Space)`
  position: fixed;
  bottom: 0px;
  width: 100%;
  background: ${(props) => props.theme.COLORS.white};
  box-shadow: -2px 0px 8px 0px rgba(0, 0, 0, 0.32);
`;
