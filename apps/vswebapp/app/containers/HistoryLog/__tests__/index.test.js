import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Services
import * as DevelopersService from 'services/developers';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import HistoryLog from '..';
import moment from 'moment';
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    type: 'api-keys',
  }),
}));

beforeEach(() => {
  jest.mock('services/developers');

  jest.spyOn(DevelopersService, 'getHistoryLog').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 15314,
          addedOn: '2022-07-13T15:52:46+05:30',
          value: 'CF1848CB79PTHAI9AE1ON2FP60',
          action: 'GENERATED',
          userName: 'Venkatesh Raju',
        },
        {
          id: 15215,
          addedOn: '2022-07-12T13:30:23+05:30',
          value: 'CF1848CB6IK5UALPJ8JG3DNLBG',
          action: 'GENERATED',
          userName: 'Logesh',
        },
        {
          id: 6598,
          addedOn: '2022-02-16T15:26:22+05:30',
          value: 'CF1848C86CKHM2HA3KP9U0GESG',
          action: 'GENERATED',
          userName: 'Rahul Mallik',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(DevelopersService, 'getHistoryLogCount').mockImplementation(() =>
    Promise.resolve({
      count: 3,
    }),
  );

  jest
    .spyOn(DevelopersService, 'getHistoryLogUsers')
    .mockImplementation(() =>
      Promise.resolve(['Venkatesh Raju', 'Logesh', 'Rahul Mallik']),
    );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In HistoryLog Container', () => {
  test('checks render', async () => {
    render(<HistoryLog />, { wrapper: Wrapper });

    const today = moment().format('YYYY-MM-DD');
    const pastDay = moment()
      .subtract(6, 'd')
      .format('YYYY-MM-DD');
    await waitFor(() => {
      expect(DevelopersService.getHistoryLog).toHaveBeenCalledWith({
        endDate: `${today} 23:59:59`,
        event: 'API Key',
        lastId: '0',
        size: 10,
        startDate: `${pastDay} 00:00:00`,
      });
    });
    await waitFor(() => {
      expect(DevelopersService.getHistoryLogCount).toHaveBeenCalledWith({
        endDate: `${today} 23:59:59`,
        event: 'API Key',
        lastId: '0',
        size: 10,
        startDate: `${pastDay} 00:00:00`,
      });
    });

    await waitFor(() => {
      expect(DevelopersService.getHistoryLogUsers).toHaveBeenCalledWith({
        endDate: `${today} 23:59:59`,
        event: 'API Key',
        lastId: '0',
        size: 10,
        startDate: `${pastDay} 00:00:00`,
      });
    });

    await waitFor(() => {
      expect(screen.queryByText('Logesh')).toBeInTheDocument();
      expect(screen.queryAllByText('GENERATED').length).toBe(3);
      expect(
        screen.queryByText('CF1848C86CKHM2HA3KP9U0GESG'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Date & Time')).toBeInTheDocument();

      document.getElementsByClassName('ui inline dropdown')[0].click();
      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();
    });

    const images = document.querySelectorAll('.ui.image');

    fireEvent.click(images[images.length - 1]);

    fireEvent.click(screen.queryByText(/Back/));

    const searchFilter = screen.queryByText(/Search & Filter/);

    const dayFilter = screen.queryAllByText('Last 7 days');

    fireEvent.click(dayFilter[0]);
    fireEvent.click(screen.queryByText(/Last Month/));

    expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
    expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const clientIdInput = screen.queryByPlaceholderText('Enter Client ID');

    await userEvent.type(clientIdInput, 'CF1848C86CKHM2HA3KP9U0GESG');

    const rahulOption = document.getElementsByName('Rahul Mallik')[0];

    fireEvent.click(rahulOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    await fireEvent.click(screen.queryByText('Apply'));

    expect(screen.queryAllByText(/Rahul Mallik/)[0]).toBeInTheDocument();

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);
    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[1]);
  });
});
