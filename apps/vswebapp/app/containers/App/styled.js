import styled from 'styled-components';

export const StyledTestBanner = styled.div`
  border-top: 2px solid #f18221;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  &:after {
    position: absolute;
    content: 'Test Environment';
    left: 46%;
    top: 0px;
    font-size: 0.75rem;
    color: ${props => props.theme.COLORS.white};
    background: #f18221;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 1px 14px;
    font-size: 0.75rem;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.04em;
  }
`;
