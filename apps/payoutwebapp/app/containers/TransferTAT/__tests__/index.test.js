import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// Services
import * as SummaryService from 'services/summary';

// Containers
import TransferTAT from '..';

// Components
import Wrapper from '__tests__/components/Wrapper';

beforeEach(() => {
  jest.mock('services/summary');

  jest.mock('services/fundSources');

  jest.spyOn(SummaryService, 'getTransferTAT').mockImplementation(() =>
    Promise.resolve({
      status: 'COMPLETED',
      data: [
        {
          tat: '1) Under 1 min',
          dateDetail: [
            {
              date: '2024-03-12',
              terminalTransfers: '3',
              percentage: '75.0',
            },
          ],
        },
        {
          tat: '2) 1-5 min',
          dateDetail: [
            {
              date: '2024-03-12',
              terminalTransfers: '0',
              percentage: '0.0',
            },
          ],
        },
        {
          tat: '3) 5-10 min',
          dateDetail: [
            {
              date: '2024-03-12',
              terminalTransfers: '0',
              percentage: '0.0',
            },
          ],
        },
        {
          tat: '4) 10-15 min',
          dateDetail: [
            {
              date: '2024-03-12',
              terminalTransfers: '0',
              percentage: '0.0',
            },
          ],
        },
        {
          tat: '5) \u003e 15 min',
          dateDetail: [
            {
              date: '2024-03-12',
              terminalTransfers: '0',
              percentage: '0.0',
            },
          ],
        },
      ],
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => <Wrapper>{children}</Wrapper>;

describe('In TransferTAT Container', () => {
  test('checks render', async () => {
    render(<TransferTAT />, { wrapper: CustomWrapper });

    expect(SummaryService.getTransferTAT).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'IMPS',
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('Amazon Pay')).toBeInTheDocument();
      expect(screen.queryByText('Credit Card UPI')).toBeInTheDocument();
      expect(screen.queryByText('CC-Nagaraj-Temp10')).toBeInTheDocument();
      expect(screen.queryByText('5-10 min')).toBeInTheDocument();
      expect(screen.queryByText('> 15 min')).toBeInTheDocument();
      expect(screen.queryAllByText('0.00%').length).toBe(4);

      expect(screen.queryByText('Mar 12th')).toBeInTheDocument();
      expect(screen.queryByText('75.00%')).toBeInTheDocument();
      expect(screen.queryByText('Total Count')).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<TransferTAT />, { wrapper: CustomWrapper });

    await waitFor(() => {
      document.getElementsByClassName('ui button dropdown')[0].click();

      expect(screen.queryByText('ICICI-124')).toBeInTheDocument();

      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();
    });

    expect(SummaryService.getTransferTAT).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'IMPS',
        fsId: 14576,
      }),
    );

    await waitFor(() => {
      document.getElementsByClassName('ui button dropdown')[1].click();

      expect(screen.queryByText('Amazon Pay')).toBeInTheDocument();

      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();
    });

    expect(SummaryService.getTransferTAT).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'NEFT',
        fsId: 14576,
      }),
    );
  });
});
