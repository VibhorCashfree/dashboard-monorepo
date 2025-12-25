import styled from 'styled-components';

export const WarningAlert = styled.div`
  font-size: 0.875rem;
  text-align: left;
  line-height: 20px;
  background: rgba(254, 165, 10, 0.2);
  padding: 1.5rem;
  margin: -1.5rem -2rem;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    display: inline-block;
    padding-left: 1rem;
    width: calc(100% - 60px);
    vertical-align: middle;
  }
`;
