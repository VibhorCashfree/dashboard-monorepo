import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Services
import * as SummaryService from 'services/summary';

// Containers
import SuccessRate from '..';

// Components
import Wrapper from '__tests__/components/Wrapper';

beforeEach(() => {
  jest.mock('services/summary');

  jest.mock('services/fundSources');

  jest.spyOn(SummaryService, 'getSuccessRate').mockImplementation(() =>
    Promise.resolve({
      status: 'COMPLETED',
      data: [
        {
          status: 'REVERSED',
          dateDetail: [
            {
              addedDate: '2024-03-11',
              statusRate: '30.0',
              bankStatusDetail: [
                {
                  bankStatus: 'FAILED',
                  totalTransfer: '3',
                },
              ],
            },
          ],
        },
        {
          status: 'SUCCESS',
          dateDetail: [
            {
              addedDate: '2024-03-11',
              statusRate: '70.0',
              bankStatusDetail: [
                {
                  bankStatus: 'COMPLETED',
                  totalTransfer: '7',
                },
              ],
            },
            {
              addedDate: '2024-03-12',
              statusRate: '28.571428571428573',
              bankStatusDetail: [
                {
                  bankStatus: 'COMPLETED',
                  totalTransfer: '2',
                },
              ],
            },
          ],
        },
        {
          status: 'FAILED',
          dateDetail: [
            {
              addedDate: '2024-03-12',
              statusRate: '57.142857142857146',
              bankStatusDetail: [
                {
                  bankStatus: 'INVALID_ACCOUNT_FAIL',
                  totalTransfer: '4',
                },
              ],
            },
          ],
        },
        {
          status: 'PENDING',
          dateDetail: [
            {
              addedDate: '2024-03-12',
              statusRate: '14.285714285714286',
              bankStatusDetail: [
                {
                  bankStatus: 'ERROR_FETCHING_STATUS',
                  totalTransfer: '1',
                },
              ],
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

describe('In SuccessRate Container', () => {
  test('checks render', async () => {
    render(<SuccessRate />, { wrapper: CustomWrapper });

    expect(SummaryService.getSuccessRate).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: '',
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('Amazon Pay')).toBeInTheDocument();
      expect(screen.queryByText('IMPS')).toBeInTheDocument();
      // expect(screen.queryByText('RTGS')).toBeInTheDocument();

      expect(screen.queryAllByText('Overall').length).toBe(4);
      expect(screen.queryAllByText('S.R.%').length).toBe(4);

      expect(screen.queryByText('Mar 12th')).toBeInTheDocument();
      expect(screen.queryByText('Mar 11th')).toBeInTheDocument();
      expect(screen.queryByText('30.00%')).toBeInTheDocument();
      expect(screen.queryByText('14.29%')).toBeInTheDocument();

      {
        const button = screen.queryByText('Success').nextSibling;

        expect(button).toHaveClass('ml-1 pointer');
        expect(button).toBeInTheDocument();

        expect(
          screen.queryByText('Transaction Completed'),
        ).not.toBeInTheDocument();

        fireEvent.click(button);

        expect(screen.queryByText('Transaction Completed')).toBeInTheDocument();
      }

      {
        const button = screen.queryByText('Pending').nextSibling;

        expect(button).toHaveClass('ml-1 pointer');
        expect(button).toBeInTheDocument();

        expect(screen.queryByText('In Process')).not.toBeInTheDocument();

        fireEvent.click(button);

        expect(screen.queryByText('In Process')).toBeInTheDocument();
      }

      {
        const button = screen.queryByText('Failed').nextSibling;

        expect(button).toHaveClass('ml-1 pointer');
        expect(button).toBeInTheDocument();

        expect(
          screen.queryByText('Invalid Account Details'),
        ).not.toBeInTheDocument();

        fireEvent.click(button);

        expect(
          screen.queryByText('Invalid Account Details'),
        ).toBeInTheDocument();
      }

      {
        const button = screen.queryByText('Reversed').nextSibling;

        expect(button).toHaveClass('ml-1 pointer');
        expect(button).toBeInTheDocument();

        expect(screen.queryByText('Any Other Reason')).not.toBeInTheDocument();

        fireEvent.click(button);

        expect(screen.queryByText('Any Other Reason')).toBeInTheDocument();
      }

      expect(screen.queryByText('Total Count')).toBeInTheDocument();
      expect(screen.queryByText('10')).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<SuccessRate />, { wrapper: CustomWrapper });

    await waitFor(() => {
      document.getElementsByClassName('ui button dropdown')[0].click();

      expect(screen.queryByText('ICICI-124')).toBeInTheDocument();

      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();
    });

    expect(SummaryService.getSuccessRate).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: '',
        fsId: 14576,
      }),
    );

    await waitFor(() => {
      document.getElementsByClassName('ui button dropdown')[1].click();

      expect(screen.queryByText('IMPS')).toBeInTheDocument();

      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();
    });

    expect(SummaryService.getSuccessRate).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'IMPS',
        fsId: 14576,
      }),
    );
  });
});
