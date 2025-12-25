import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import moment from 'moment';
import ShallowRenderer from 'react-test-renderer/shallow';

// Constants
import { FORMATS } from 'constants/date';

// Services
import * as AccountsService from 'services/accounts';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import Statements from '..';

const renderer = new ShallowRenderer();

beforeEach(() => {
  jest.mock('services/accounts');

  jest.spyOn(AccountsService, 'getStatements').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 1002505070,
          txTime: '2022-11-30T18:46:02+05:30',
          eventType: 'PANDETAILS_VERIFICATION',
          maskedEventType: 'PAN Details Verification',
          event: 'DEBIT',
          amount: '0',
          remarks: 'RefId-1642658/PAN Verification',
          closingBalance: '2024306.72',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(AccountsService, 'getStatementsCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In Statements Container', () => {
  test('checks render', async () => {
    render(<Statements />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(AccountsService.getStatements).toHaveBeenCalledWith({
        eventType: [],
        size: 10,
        startDate: moment()
          .subtract(6, 'days')
          .startOf('day')
          .format(FORMATS.START_DATE),
        endDate: moment().format(FORMATS.END_DATE),
        lastId: '0',
      });

      expect(AccountsService.getStatementsCount).toHaveBeenCalledWith({
        eventType: [],
        size: 10,
        startDate: moment()
          .subtract(6, 'days')
          .startOf('day')
          .format(FORMATS.START_DATE),
        endDate: moment().format(FORMATS.END_DATE),
        lastId: '0',
      });
    });

    await waitFor(() => {
      expect(
        screen.queryByText('PAN Details Verification'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('RefId-1642658/PAN Verification'),
      ).toBeInTheDocument();
      expect(screen.queryByText('₹ 0.00')).toBeInTheDocument();
      expect(
        screen.queryByText(/Statement for only 7 days can be viewed here./),
      ).toBeInTheDocument();

      fireEvent.click(screen.queryByText('Last 7 days'));
    });

    expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
    expect(screen.queryByText(/Last 15 days/)).toBeInTheDocument();
    fireEvent.click(screen.queryByText('Search & Filter'));

    expect(screen.queryByText('No search available')).toBeInTheDocument();
    expect(screen.queryByText('Bank Transfers')).toBeInTheDocument();
  });

  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <Statements />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
