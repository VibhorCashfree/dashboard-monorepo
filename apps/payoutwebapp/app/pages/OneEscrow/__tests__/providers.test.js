import React from 'react';
import { render, screen } from '@testing-library/react';

// Mocks
import { mockEscrowProvider } from '__mocks__/common.mock';

// Providers
import { EscrowAccountContext, EscrowAccountProvider } from '../providers';

jest.mock('services/fundSources', () => ({
  getVirtualAccounts: jest.fn(() => Promise.resolve(mockEscrowProvider)),
}));

describe('EscrowAccountProvider', () => {
  test('should make context value accessbile to Consumer', async () => {
    render(
      <EscrowAccountProvider>
        <EscrowAccountContext.Consumer>
          {({ details, virtualAccounts, setFetchCounter }) => (
            <>
              <div>Details: {typeof details}</div>
              <ul>
                {virtualAccounts.map((value) => (
                  <li key={value.fundSourceId}>
                    {value.paymentInstrumentId}: {value.displayName}
                  </li>
                ))}
              </ul>
              <div>setFetchCounter: {typeof setFetchCounter}</div>
            </>
          )}
        </EscrowAccountContext.Consumer>
      </EscrowAccountProvider>,
    );

    await screen.findByText('YES_b319d91: Test_priyanka');
    await screen.findByText('YES_CONNECTED_1_832746b: hhhyu');
    await screen.findByText('YES_CONNECTED_1_a53db9a: erer');
    await screen.findByText('Details: undefined');
    await screen.findByText('setFetchCounter: function');
  });
});
