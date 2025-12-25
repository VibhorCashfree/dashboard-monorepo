import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as CashgramsService from 'services/cashgrams';

// Utils
import Analytics from 'utils/analytics';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { MODAL_TYPE } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Containers
import BatchCashgramDetails from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    state: {
      batchRowDetails: {
        fileName: 'cashgram_1.xls',
        id: 4519,
        status: 'PENDING_APPROVAL',
        countCashgrams: 3,
        addedOn: '2021-11-24T14:35:56+05:30',
        valid: 3,
        invalid: 0,
        uploadedBy: 'Shivangi Agarwal',
        approvalCount: 0,
        totalApprovalCount: 1,
        totalAmount: '6',
      },
      toBeApproved: true,
    },
  }),
  useNavigate: () => mockNavigate,
}));

jest.mock('utils/analytics', () => ({
  track: jest.fn(),
}));

beforeEach(() => {
  jest.mock('services/cashgrams');

  jest
    .spyOn(CashgramsService, 'getBatchApprovalDetails')
    .mockImplementation(() =>
      Promise.resolve({ approvals: [], rejections: [] }),
    );

  jest.spyOn(CashgramsService, 'getBatchStats').mockImplementation(() =>
    Promise.resolve({
      total: 3,
      invalid: 0,
      partiallyApproved: 0,
      pendingApproval: 3,
      redeemed: 0,
      failed: 0,
      reversed: 0,
      rejected: 0,
      pending: 0,
      cancelled: 0,
      expired: 0,
      active: 0,
      approved: 0,
      manuallyRejected: 0,
      opened: 0,
      received: 0,
    }),
  );

  jest.spyOn(CashgramsService, 'getBatchEntries').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 397045,
          cashgramId: 'TEST_CF_3816',
          amount: '2',
          name: 'John Doe',
          addedOn: '2021-11-24T14:35:56+05:30',
          status: 'PENDING_APPROVAL',
          phone: '7777777777',
          expiry: '2021/11/15',
          approvalCount: 0,
          totalApprovalCount: 0,
        },
        {
          id: 397044,
          cashgramId: 'TEST_CF_2816',
          amount: '2',
          name: 'John Doe',
          addedOn: '2021-11-24T14:35:56+05:30',
          status: 'PENDING_APPROVAL',
          phone: '8888888888',
          expiry: '2021/11/21',
          approvalCount: 0,
          totalApprovalCount: 0,
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(CashgramsService, 'getBatchEntriesCount').mockImplementation(() =>
    Promise.resolve({
      count: 2,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In BatchCashgramDetails Container', () => {
  test('checks render', async () => {
    render(<BatchCashgramDetails />, { wrapper: CustomWrapper });

    expect(CashgramsService.getBatchStats).toHaveBeenCalledWith(4519, true);

    await waitFor(() => {
      expect(CashgramsService.getBatchApprovalDetails).toHaveBeenCalledWith(
        4519,
      );
    });

    expect(CashgramsService.getBatchEntries).toHaveBeenCalledWith(4519, {
      approveSection: true,
      size: 10,
      lastId: '0',
      status: [],
    });
    expect(CashgramsService.getBatchEntriesCount).toHaveBeenCalledWith(4519, {
      approveSection: true,
      size: 10,
      lastId: '0',
      status: [],
    });

    await waitFor(() => {
      expect(screen.queryByText('TEST_CF_2816')).toBeInTheDocument();
      expect(screen.queryByText('4519')).toBeInTheDocument();
      expect(screen.queryAllByText('Pending Approval').length).toBe(4);
      expect(screen.queryByText('8888888888')).toBeInTheDocument();
      expect(screen.queryByText('cashgram_1.xls')).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<BatchCashgramDetails />, { wrapper: CustomWrapper });

    await waitFor(() => {
      document.getElementsByClassName('ui inline dropdown')[0].click();
    });

    const searchFilter = screen.queryByText(/Search & Filter/);

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const filterOption = document.getElementsByName('PENDING_APPROVAL')[0];

    fireEvent.click(filterOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.APPLIED_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.CASHGRAMS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH_DETAILS],
        filters: { PENDING_APPROVAL: true },
        search_by: 'cashgramId',
      }),
    );

    expect(screen.queryAllByText(/Pending Approval/).length).toBe(3);

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(6);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const handleAction = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.APPROVE}
        setModalType={setModalType}
        count="2"
        amount="456"
        handleAction={handleAction}
        hasBatchPreference={false}
        batchRowDetails={{ fileName: 'foo bar' }}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Approve Cashgrams')).toBeInTheDocument();

      expect(
        screen.queryByText(
          'Are you sure you want to approve the selected cashgrams?',
        ),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Approve',
      });

      expect(submitButton).toHaveClass('ml-2');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(handleAction).toHaveBeenCalled();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const handleAction = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.REJECT}
        setModalType={setModalType}
        count="2"
        amount="456"
        handleAction={handleAction}
        hasBatchPreference={false}
        batchRowDetails={{ fileName: 'foo bar' }}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Reject Cashgrams')).toBeInTheDocument();

      expect(
        screen.queryByText(
          'Are you sure you want to reject the selected cashgrams?',
        ),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Reject',
      });

      expect(submitButton).toHaveClass('ml-2');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(handleAction).toHaveBeenCalled();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.APPROVED}
        setModalType={setModalType}
        count="2"
        amount="456"
        handleAction={jest.fn()}
        hasBatchPreference={false}
        batchRowDetails={{ fileName: 'foo bar' }}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Cashgrams Approved Successfully'),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.REJECTED}
        setModalType={setModalType}
        count="2"
        amount="456"
        handleAction={jest.fn()}
        hasBatchPreference={false}
        batchRowDetails={{ fileName: 'foo bar' }}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Cashgrams Rejected')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();
    });
  });

  test('back button is functional', async () => {
    render(<BatchCashgramDetails />, { wrapper: CustomWrapper });

    await waitFor(() => {
      const backButton = screen.getByText('Back');
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('checks Row click', async () => {
    render(<BatchCashgramDetails />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.CASHGRAMS]}/397045/details`,
      {
        state: {
          rowDetails: {
            id: 397045,
            cashgramId: 'TEST_CF_3816',
            amount: '2',
            name: 'John Doe',
            addedOn: '2021-11-24T14:35:56+05:30',
            status: 'PENDING_APPROVAL',
            phone: '7777777777',
            expiry: '2021/11/15',
            approvalCount: 0,
            totalApprovalCount: 0,
          },
          fromBatch: true,
        },
      },
    );
  });
});
