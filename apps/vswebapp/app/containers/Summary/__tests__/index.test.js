import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import moment from 'moment';

// Constants
import { FORMATS } from 'constants/date';

// Utils
import notification from 'utils/notification';

// Services
import * as SummaryService from 'services/summary';

// Containers
import { Summary } from '..';

// Components
import Wrapper from '__tests__/components/Wrapper';
import CustomTooltip from '../components/CustomTooltip';

beforeEach(() => {
  jest.mock('services/summary');

  jest
    .mock('utils/notification')
    .spyOn(notification, 'get')
    .mockImplementation(() => ['2FA', 'API_KEY']);

  jest.spyOn(SummaryService, 'getStats').mockImplementation(() =>
    Promise.resolve({
      totalCount: 4,
      type: 'BAV',
      entries: [
        {
          startTime: '2021-12-21 00:00',
          endTime: '2021-12-22 00:00',
          details: [
            {
              status: 'SUCCESS',
              count: 2,
            },
            {
              status: 'PENDING',
              count: 0,
            },
          ],
        },
        {
          startTime: '2021-12-23 00:00',
          endTime: '2021-12-24 00:00',
          details: [
            {
              status: 'FAILED',
              count: 2,
            },
            {
              status: 'PENDING',
              count: 0,
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

describe('In Summary Container', () => {
  test('Zero Balance Alert should work for 0 available balance', async () => {
    const fetchAvailableBalance = jest.fn();
    const fetchFreeCredits = jest.fn();

    render(
      <Summary
        availableBalance={{
          availableBalance: '0',
          balance: '9988386845.61',
          overdraft: '10000',
          fundsOnHold: '33997369.61',
        }}
        fetchAvailableBalance={fetchAvailableBalance}
        fetchFreeCredits={fetchFreeCredits}
      />,
      { wrapper: Wrapper },
    );

    expect(SummaryService.getStats).toHaveBeenCalledWith({
      startDate: moment()
        .subtract(6, 'days')
        .startOf('day')
        .format(FORMATS.START_DATE),
      endDate: moment().format(FORMATS.END_DATE),
      reportType: 'BAV',
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/Recharge your Account to get started./i),
      ).toBeInTheDocument();
    });

    expect(fetchAvailableBalance).toHaveBeenCalled();
    expect(fetchFreeCredits).toHaveBeenCalled();
  });

  test('Zero Balance Alert should work for non-zero available balance', async () => {
    const fetchAvailableBalance = jest.fn();
    const fetchFreeCredits = jest.fn();

    render(
      <Summary
        availableBalance={{
          availableBalance: '1',
          balance: '9988386845.61',
          overdraft: '10000',
          fundsOnHold: '33997369.61',
        }}
        fetchAvailableBalance={fetchAvailableBalance}
        fetchFreeCredits={fetchFreeCredits}
      />,
      { wrapper: Wrapper },
    );

    expect(SummaryService.getStats).toHaveBeenCalledWith({
      startDate: moment()
        .subtract(6, 'days')
        .startOf('day')
        .format(FORMATS.START_DATE),
      endDate: moment().format(FORMATS.END_DATE),
      reportType: 'BAV',
    });

    expect(
      screen.queryByText(/Recharge your Account to get started./i),
    ).toBeNull();

    expect(fetchAvailableBalance).toHaveBeenCalled();
    expect(fetchFreeCredits).toHaveBeenCalled();
  });

  test('check <CustomTooltip />', async () => {
    const onChange = jest.fn();

    render(
      <CustomTooltip
        active
        payload={[
          {
            name: 'foo',
            color: 'blue',
            payload: { amount: { foo: 10 }, count: { foo: 200 } },
          },
        ]}
        onChange={onChange}
      />,
      {
        wrapper: Wrapper,
      },
    );

    await waitFor(() => {
      expect(screen.queryByText('foo')).toBeInTheDocument();
      expect(screen.queryByText('foo')).toHaveClass('title');

      expect(screen.queryByText('200')).toBeInTheDocument();
      expect(screen.queryByText('200')).toHaveClass('count-value');
    });
  });
});
