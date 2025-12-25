import styled from 'styled-components';

export const EscrowRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  gap: 5px;

  > div:nth-child(1) {
    flex: 1;
  }

  > div:nth-child(2) {
    flex: 1;
  }

  > div:nth-child(3) {
    flex: 4;
  }
`;

export const PartyRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  gap: 5px;

  > div:nth-child(1) {
    flex: 4;
  }

  > div:nth-child(2) {
    flex: 4;
  }

  > div:nth-child(3) {
    flex: 1.5;
  }
`;

export const PartyRowValue = styled.div<{ children: React.ReactNode }>`
  display: flex;
  margin-bottom: 16px;
  gap: 5px;

  > div:nth-child(1) {
    flex: 4;
  }

  > div:nth-child(2) {
    flex: 5.5;
  }
`;
