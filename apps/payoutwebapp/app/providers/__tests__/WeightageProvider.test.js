import React from 'react';
import { render, screen } from '@testing-library/react';

// Providers
import { WeightageContext, WeightageProvider } from '../WeightageProvider';

jest.mock('services/fundSources', () => ({
  getWeightage: jest.fn(() =>
    Promise.resolve([
      {
        id: 49304,
        name: 'YESB_CONN_102',
        weightage: '0',
      },
      {
        id: 1007,
        name: 'CASHFREE_102',
        weightage: '100',
      },
    ]),
  ),
}));

describe('WeightageProvider', () => {
  test('should make context value accessbile to Consumer', async () => {
    render(
      <WeightageProvider>
        <WeightageContext.Consumer>
          {({ weightage }) => (
            <ul>
              {weightage.map((value) => (
                <li key={value.id}>
                  {value.name}: {value.weightage}
                </li>
              ))}
            </ul>
          )}
        </WeightageContext.Consumer>
      </WeightageProvider>,
    );

    await screen.findByText('CASHFREE_102: 100');
  });
});
