import React from 'react';
import { render, screen } from '@testing-library/react';

// Providers
import {
  BatchDetailsContext,
  BatchDetailsProvider,
} from '../BatchDetailsProvider';

describe('BatchDetailsProvider', () => {
  test('should make context value accessbile to Consumer', async () => {
    render(
      <BatchDetailsProvider>
        <BatchDetailsContext.Consumer>
          {({ state }) => (
            <ul>
              <li>Limit : {state.limit}</li>
              <li>Date : {state.dateValue.displayText}</li>
            </ul>
          )}
        </BatchDetailsContext.Consumer>
      </BatchDetailsProvider>,
    );

    await screen.findByText('Limit : 10');
    await screen.findByText('Date : Last 7 days');
  });
});
