import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { DetailsContext } from 'containers/FundSourceDetails/providers';

// Mocks
import { mockDetailsProvider } from '__mocks__/common.mock';

// Services
import * as FundSourcesService from 'services/fundSources';

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
import RechargeHistory from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <DetailsContext.Provider value={mockDetailsProvider}>
      {children}
    </DetailsContext.Provider>
  </Wrapper>
);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('utils/analytics', () => ({
  track: jest.fn(),
}));

beforeEach(() => {
  jest.mock('services/fundSources');

  jest.spyOn(FundSourcesService, 'getRechargeHistory').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          addedon: '2022-09-14T15:25:46+05:30',
          updatedon: '2022-09-14T15:26:15+05:30',
          amount: '10',
          rechargedAmount: '9.72',
          serviceCharge: '0.24',
          serviceTax: '0.04',
          eventType: 'CC_RECHARGE',
          status: 'SUCCESS',
          reason: '',
          utr: '6631493656656811006958',
          id: 851575,
        },
        {
          addedon: '2022-09-14T15:24:45+05:30',
          updatedon: '2022-09-14T15:25:08+05:30',
          amount: '10',
          rechargedAmount: '9.72',
          serviceCharge: '0.24',
          serviceTax: '0.04',
          eventType: 'CC_REGISTER',
          status: 'SUCCESS',
          reason: '',
          utr: '6631493013296894805960',
          id: 851573,
        },
      ],
      hasNext: false,
    }),
  );

  jest
    .spyOn(FundSourcesService, 'getRechargeHistoryCount')
    .mockImplementation(() =>
      Promise.resolve({
        count: 2,
      }),
    );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In RechargeHistory Container', () => {
  test('checks render', async () => {
    render(<RechargeHistory />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(FundSourcesService.getRechargeHistory).toHaveBeenCalledWith(
        39240,
        expect.objectContaining({
          status: [],
          size: 10,
          lastId: '0',
        }),
      );

      expect(FundSourcesService.getRechargeHistoryCount).toHaveBeenCalledWith(
        39240,
        expect.objectContaining({
          status: [],
          size: 10,
          lastId: '0',
        }),
      );
    });

    await waitFor(() => {
      expect(screen.queryByText('6631493656656811006958')).toBeInTheDocument();
      expect(screen.queryAllByText('Success').length).toBe(2);
      expect(screen.queryByText('Recharge Amount')).toBeInTheDocument();
      expect(screen.queryAllByText('₹ 10.00').length).toBe(2);
      expect(
        screen.queryByText('about account recharge history'),
      ).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<RechargeHistory />, { wrapper: CustomWrapper });

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
        section: LABEL_BY_MENU[MENU.FUND_SOURCES],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.RECHARGE_HISTORY],
      }),
    );

    expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
    expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const filterOption = document.getElementsByName('SUCCESS')[0];

    fireEvent.click(filterOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.APPLIED_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.FUND_SOURCES],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.RECHARGE_HISTORY],
        filters: { SUCCESS: true },
        search_by: 'utr',
      }),
    );

    expect(screen.queryAllByText(/Success/).length).toBe(1);

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(6);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  test('checks Row click', async () => {
    render(<RechargeHistory />, { wrapper: CustomWrapper });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
