import React from 'react';
import { render } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import GSTINDetails from '..';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    state: {
      fromBatch: true,
      fileType: 'foo',
      rowDetails: {
        message: 'Sorry it Failed',
        status: 'VERIFICATION_FAILED',
      },
    },
  }),
}));

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In GSTINDetails FailedDetails', () => {
  test('checks render', async () => {
    render(<GSTINDetails />, { wrapper: Wrapper });
  });
});
