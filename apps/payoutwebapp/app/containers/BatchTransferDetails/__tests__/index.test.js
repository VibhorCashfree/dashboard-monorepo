import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as TransfersService from 'services/transfers';

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
import BatchTransferDetails from '..';

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
        fileName: 'test_v12',
        id: 22217124,
        status: 'PROCESSED',
        countTransfers: 1,
        addedOn: '2022-09-22T11:51:57+05:30',
        valid: 1,
        invalid: 0,
        uploadedBy: '',
        approvalCount: 0,
        totalApprovalCount: 0,
        fileType: 'CFTRANSFER_BENEID',
        totalAmount: '2',
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
  jest.mock('services/transfers');

  jest
    .spyOn(TransfersService, 'getBatchApprovalDetails')
    .mockImplementation(() =>
      Promise.resolve({ approvals: [], rejections: [] }),
    );

  jest.spyOn(TransfersService, 'getBatchStats').mockImplementation(() =>
    Promise.resolve({
      total: 1,
      invalid: 0,
      partiallyApproved: 0,
      pendingApproval: 0,
      success: 1,
      failed: 0,
      reversed: 0,
      pending: 0,
      cancelled: 0,
      approved: 0,
      manuallyRejected: 0,
      received: 0,
    }),
  );

  jest.spyOn(TransfersService, 'getBatchEntries').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          transferId: 'test_v12_1',
          referenceId: 728562267,
          beneficiaryId: 'amit',
          addedOn: '2022-09-22T11:51:57+05:30',
          processedOn: '2022-09-22T12:01:57+05:30',
          utr: 'CT603878045',
          amount: '2',
          status: 'SUCCESS',
          id: 33032767,
          bankAccount: '',
          ifsc: '',
          phone: '',
          vpa: '',
          transferMode: '',
          email: '',
          name: '',
          reason: '',
          remarks: 'working',
          approvalCount: 0,
          totalApprovalCount: 0,
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(TransfersService, 'getBatchEntriesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In BatchTransferDetails Container', () => {
  test('checks render', async () => {
    render(<BatchTransferDetails />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(TransfersService.getBatchStats).toHaveBeenCalledWith(
        22217124,
        true,
      );
      expect(TransfersService.getBatchApprovalDetails).toHaveBeenCalledWith(
        22217124,
      );
    });

    expect(TransfersService.getBatchEntries).toHaveBeenCalledWith(22217124, {
      approveSection: true,
      size: 10,
      lastId: '0',
      status: [],
    });
    expect(TransfersService.getBatchEntriesCount).toHaveBeenCalledWith(
      22217124,
      {
        approveSection: true,
        size: 10,
        lastId: '0',
        status: [],
      },
    );

    await waitFor(() => {
      expect(screen.queryAllByText(/test_v12/).length).toBe(2);
      expect(screen.queryAllByText('₹ 2.00').length).toBe(2);
      expect(screen.queryByText('Processed')).toBeInTheDocument();
      expect(screen.queryAllByText('Success').length).toBe(2);
      expect(screen.queryAllByText(/22 Sep 2022/).length).toBe(2);
      expect(screen.queryByText('amit')).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<BatchTransferDetails />, { wrapper: CustomWrapper });

    await waitFor(() => {
      document.getElementsByClassName('ui inline dropdown')[0].click();
    });

    const searchFilter = screen.queryByText(/Search & Filter/);

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const filterOption = document.getElementsByName('PARTIALLY_APPROVED')[0];

    fireEvent.click(filterOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.APPLIED_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.TRANSFERS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH_DETAILS],
        filters: { PARTIALLY_APPROVED: true },
        search_by: 'transferId',
      }),
    );

    expect(screen.queryAllByText(/Success/).length).toBe(1);

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(9);
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
      expect(screen.queryByText('Approve Transfers')).toBeInTheDocument();

      expect(
        screen.queryByText(
          'Are you sure you want to approve the selected transfers?',
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
      expect(screen.queryByText('Reject Transfers')).toBeInTheDocument();

      expect(
        screen.queryByText(
          'Are you sure you want to reject the selected transfers?',
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
        screen.queryByText('Transfers Approved Successfully'),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);
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
      expect(screen.queryByText('Transfers Rejected')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);
    });
  });

  test('back button is functional', async () => {
    render(<BatchTransferDetails />, { wrapper: CustomWrapper });

    await waitFor(() => {
      const backButton = screen.getByText('Back');
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('checks Row click', async () => {
    render(<BatchTransferDetails />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.TRANSFERS]}/33032767/details`,
      {
        state: {
          rowDetails: {
            transferId: 'test_v12_1',
            referenceId: 728562267,
            beneficiaryId: 'amit',
            addedOn: '2022-09-22T11:51:57+05:30',
            processedOn: '2022-09-22T12:01:57+05:30',
            utr: 'CT603878045',
            amount: '2',
            status: 'SUCCESS',
            id: 33032767,
            bankAccount: '',
            ifsc: '',
            phone: '',
            vpa: '',
            transferMode: '',
            email: '',
            name: '',
            reason: '',
            remarks: 'working',
            approvalCount: 0,
            totalApprovalCount: 0,
          },
          fileType: 'CFTRANSFER_BENEID',
          fromBatch: true,
        },
      },
    );
  });
});
