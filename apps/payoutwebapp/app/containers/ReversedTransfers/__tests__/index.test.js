import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as TransfersService from 'services/transfers';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import ReversedTransfers from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/transfers');

  jest.spyOn(TransfersService, 'getAllReversed').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 3411816,
          transferId: 'test_sunilt46',
          beneficiaryId: 318507253,
          referenceId: 817249208,
          utr: 'YESB23331313629',
          amount: '1.2',
          processedOn: '2022-11-30T14:06:45+05:30',
          reason: 'ANY_OTHER_REASON',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(TransfersService, 'getAllReversedCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In ReversedTransfers Container', () => {
  test('checks render', async () => {
    render(<ReversedTransfers />, { wrapper: CustomWrapper });

    expect(TransfersService.getAllReversed).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
      }),
    );
    expect(TransfersService.getAllReversedCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('test_sunilt46')).toBeInTheDocument();
      expect(screen.queryByText('817249208')).toBeInTheDocument();
      expect(screen.queryByText('Any other reason')).toBeInTheDocument();
      expect(
        screen.queryByText('All transfers that are reversed are shown here.'),
      ).toBeInTheDocument();
    });
  });
});
