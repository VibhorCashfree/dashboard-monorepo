import React from 'react';
import { render, screen } from '@testing-library/react';

// Providers
import { ListContext, ListProvider } from '../ListProvider';

describe('ListProvider', () => {
  test('should make context value accessbile to Consumer', async () => {
    render(
      <ListProvider>
        <ListContext.Consumer>
          {({ state }) => (
            <ul>
              <li>Limit : {state.limit}</li>
              <li>Date : {state.dateValue.displayText}</li>
            </ul>
          )}
        </ListContext.Consumer>
      </ListProvider>,
    );

    await screen.findByText('Limit : 10');
    await screen.findByText('Date : Last 7 days');
  });
});
