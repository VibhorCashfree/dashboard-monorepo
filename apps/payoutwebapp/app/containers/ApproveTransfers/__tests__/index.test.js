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
import ApproveTransfers from '..';

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
  useNavigate: () => mockNavigate,
}));

jest.mock('utils/analytics', () => ({
  track: jest.fn(),
}));

beforeEach(() => {
  jest.mock('services/transfers');

  jest.spyOn(TransfersService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          addedOn: '2024-02-29 13:24:05',
          amount: 1231,
          bankAccount: '234005000876',
          beneName: 'Cashfree',
          beneficiaryId: 'ICICI_FAILED',
          currencyCode: 'INR',
          description: '',
          ifsc: 'ICIC0000007',
          mode: 'IMPS',
          paymentInstrumentId: 'YES_CONNECTED_1_a2a496b',
          referenceId: 658349296,
          status: 'APPROVAL_PENDING',
          transferId: '12d25HUpAoB1gmwkSHO85JgKNu2k',
          utr: '',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(TransfersService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In ApproveTransfers Container', () => {
  test('checks render', async () => {
    render(<ApproveTransfers />, { wrapper: CustomWrapper });

    expect(TransfersService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        num: 1,
        status: ['APPROVAL_PENDING'],
      }),
    );
    expect(TransfersService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        num: 1,
        status: ['APPROVAL_PENDING'],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('Pending Approval')).toBeInTheDocument();
      expect(
        screen.queryByText('12d25HUpAoB1gmwkSHO85JgKNu2k'),
      ).toBeInTheDocument();
      expect(screen.queryByText('ICIC0000007')).toBeInTheDocument();
      expect(
        screen.queryByText('Showing all transfers for approval.'),
      ).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<ApproveTransfers />, { wrapper: CustomWrapper });

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
        section: LABEL_BY_MENU[MENU.TRANSFERS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.APPROVE],
      }),
    );

    expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
    expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(9);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const handleAction = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.VERIFY}
        setModalType={setModalType}
        count="2"
        amount="456"
        handleAction={handleAction}
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
        modalType={MODAL_TYPE.VERIFIED}
        setModalType={setModalType}
        count="2"
        amount="456"
        handleAction={jest.fn()}
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

      expect(setModalType).toHaveBeenCalled();
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
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Transfers Rejected')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Row click', async () => {
    render(<ApproveTransfers />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.TRANSFERS]}/658349296/details`,
      {
        state: {
          rowDetails: {
            addedOn: '2024-02-29 13:24:05',
            amount: 1231,
            bankAccount: '234005000876',
            beneName: 'Cashfree',
            beneficiaryId: 'ICICI_FAILED',
            currencyCode: 'INR',
            description: '',
            ifsc: 'ICIC0000007',
            mode: 'IMPS',
            paymentInstrumentId: 'YES_CONNECTED_1_a2a496b',
            referenceId: 658349296,
            id: 658349296,
            status: 'APPROVAL_PENDING',
            transferId: '12d25HUpAoB1gmwkSHO85JgKNu2k',
            utr: '',
          },
        },
      },
    );
  });
});
