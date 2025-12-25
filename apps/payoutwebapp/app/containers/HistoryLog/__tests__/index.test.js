import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Services
import * as DevelopersService from 'services/developers';

// Utils
import Analytics from 'utils/analytics';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import HistoryLog from '..';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    type: 'api-keys',
  }),
  useNavigate: () => mockNavigate,
}));

jest.mock('utils/analytics', () => ({
  track: jest.fn(),
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

    expect(DevelopersService.getHistoryLog).toHaveBeenCalledWith(
      expect.objectContaining({
        userName: [],
        size: 10,
        lastId: '0',
        event: 'API Key',
      }),
    );
    expect(DevelopersService.getHistoryLogCount).toHaveBeenCalledWith(
      expect.objectContaining({
        userName: [],
        size: 10,
        lastId: '0',
        event: 'API Key',
      }),
    );

    await waitFor(() => {
      expect(DevelopersService.getHistoryLogUsers).toHaveBeenCalledWith(
        expect.objectContaining({
          userName: [],
          size: 10,
          lastId: '0',
          event: 'API Key',
        }),
      );
    });

    await waitFor(() => {
      expect(screen.queryByText('Logesh')).toBeInTheDocument();
      expect(screen.queryAllByText('GENERATED').length).toBe(3);
      expect(
        screen.queryByText('CF1848C86CKHM2HA3KP9U0GESG'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Date & Time')).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<HistoryLog />, { wrapper: Wrapper });

    await waitFor(() => {
      document.getElementsByClassName('ui inline dropdown')[0].click();

      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();
    });

    expect(Analytics.track).toHaveBeenCalledWith(EVENTS.CHANGE_PAGE_LIMIT, {
      size: '25',
    });

    const searchFilter = screen.queryByText(/Search & Filter/);

    fireEvent.click(screen.queryByText(/Last 7 days/));
    fireEvent.click(screen.queryByText(/Last Month/));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.DATE_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.DEVELOPERS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.HISTORY_LOG],
      }),
    );

    expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
    expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const filterOption = document.getElementsByName('Venkatesh Raju')[0];

    fireEvent.click(filterOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.APPLIED_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.DEVELOPERS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.HISTORY_LOG],
        filters: { 'Venkatesh Raju': true },
        search_by: 'value',
      }),
    );

    expect(screen.queryAllByText(/Venkatesh Raju/).length).toBe(1);

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(4);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  test('back button is functional', async () => {
    render(<HistoryLog />, { wrapper: Wrapper });

    await waitFor(() => {
      const backButton = screen.getByText('Back');
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('checks Row click', async () => {
    render(<HistoryLog />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
