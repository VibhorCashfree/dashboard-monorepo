import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import moment from 'moment';

// Providers
import { DetailsContext } from 'containers/FundSourceDetails/providers';

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
import { FORMATS } from 'constants/date';

// Mocks
import { mockDetailsProvider } from '__mocks__/common.mock';

// Services
import * as FundSourcesService from 'services/fundSources';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import Statements from '..';

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

  jest.spyOn(FundSourcesService, 'getStatements').mockImplementation(() =>
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

  jest.spyOn(FundSourcesService, 'getStatementsCount').mockImplementation(() =>
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
    render(<Statements details={mockDetailsProvider.details} />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      expect(FundSourcesService.getStatements).toHaveBeenCalledWith({
        eventType: [],
        size: 10,
        paymentInstrumentId: 'CREDIT_CARD_102_c5fecd2',
        startDate: moment()
          .subtract(6, 'days')
          .startOf('day')
          .format(FORMATS.START_DATE),
        endDate: moment().format(FORMATS.END_DATE),
        lastId: '0',
      });
      expect(FundSourcesService.getStatementsCount).toHaveBeenCalledWith({
        eventType: [],
        size: 10,
        paymentInstrumentId: 'CREDIT_CARD_102_c5fecd2',
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
      expect(screen.queryByText('₹ 19.44')).toBeInTheDocument();
      expect(
        screen.queryByText(/Statement for only 7 days can be viewed here./),
      ).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<Statements details={mockDetailsProvider.details} />, {
      wrapper: CustomWrapper,
    });

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

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const filterOption = document.getElementsByName(
      'PANDETAILS_VERIFICATION',
    )[0];

    fireEvent.click(filterOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.APPLIED_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.FUND_SOURCES],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.STATEMENTS],
        filters: { PANDETAILS_VERIFICATION: true },
      }),
    );

    expect(screen.queryAllByText(/PAN Details Verification/).length).toBe(1);

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(6);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  test('checks Row click', async () => {
    render(<Statements details={mockDetailsProvider.details} />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
