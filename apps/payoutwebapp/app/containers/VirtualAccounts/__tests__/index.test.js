import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mocks
import { mockEscrowProvider } from '__mocks__/common.mock';

// Utils
import * as ValidationUtil from 'utils/formValidation';

// Services
import * as FundSourcesService from 'services/fundSources';

// Providers
import { EscrowAccountContext } from 'pages/OneEscrow/providers';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
} from 'constants/menuItems';
import { MODAL_TYPE } from '../constants';

// Containers
import VirtualAccounts from '../';

const mockNavigate = jest.fn();

const mockRequiredValidation = jest.fn();
const mockAmountValidation = jest.fn();
const mockRemarksValidation = jest.fn();
const mockCardNumberValidation = jest.fn();
const mockExpiryValidation = jest.fn();
const mockCVVValidation = jest.fn();
const mockNameValidation = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <EscrowAccountContext.Provider
      value={{
        details: mockEscrowProvider[0],
        virtualAccounts: mockEscrowProvider,
      }}
    >
      {children}
    </EscrowAccountContext.Provider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('utils/formValidation');

  jest
    .spyOn(ValidationUtil, 'requiredValidation')
    .mockImplementation(mockRequiredValidation);

  jest
    .spyOn(ValidationUtil, 'amountValidation')
    .mockImplementation(mockAmountValidation);

  jest
    .spyOn(ValidationUtil, 'remarksValidation')
    .mockImplementation(mockRemarksValidation);

  jest
    .spyOn(ValidationUtil, 'cardNumberValidation')
    .mockImplementation(mockCardNumberValidation);

  jest
    .spyOn(ValidationUtil, 'expiryValidation')
    .mockImplementation(mockExpiryValidation);

  jest
    .spyOn(ValidationUtil, 'cvvValidation')
    .mockImplementation(mockCVVValidation);

  jest
    .spyOn(ValidationUtil, 'nameValidation')
    .mockImplementation(mockNameValidation);

  jest.mock('services/fundSources');

  jest
    .spyOn(FundSourcesService, 'remove')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'addBalance')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'internalFundTransfer')
    .mockImplementation(() => Promise.resolve({}));

  jest.spyOn(FundSourcesService, 'getBalance').mockImplementation(() =>
    Promise.resolve({
      balance: '100',
      availableBalance: '100',
      fundsOnHold: '0',
      overdraft: '0',
      lastUpdated: '2024-09-19 18:02:31',
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('VirtualAccounts Component', () => {
  test('renders correctly', async () => {
    render(<VirtualAccounts />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(
        screen.queryByText('List Of Created Virtual Accounts'),
      ).toBeInTheDocument();

      expect(
        screen.queryByText(/all the virtual accounts created on top /),
      ).toBeInTheDocument();
      expect(screen.queryByText('Created At')).toBeInTheDocument();
      expect(screen.queryByText('Acc. Balance')).toBeInTheDocument();

      expect(screen.queryByText('Test_priyanka')).toBeInTheDocument();
      expect(screen.queryByText('erer')).toBeInTheDocument();

      expect(screen.queryByText('97654104VZJ')).toBeInTheDocument();
      expect(screen.queryByText('97654104XXX')).toBeInTheDocument();
      expect(screen.queryByText('97654107BWT')).toBeInTheDocument();

      expect(screen.queryByText('₹ 100.00')).toBeInTheDocument();
      expect(screen.queryByText('₹ 200.00')).toBeInTheDocument();
      expect(screen.queryByText('₹ 1,503.00')).toBeInTheDocument();

      expect(screen.queryAllByText('Active').length).toBe(3);
      expect(screen.queryByText('Deactivated')).toBeInTheDocument();

      expect(screen.getAllByTestId('table-header-cell').length).toBe(6);
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.DELETE}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={mockEscrowProvider[0]}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText(/Are you sure you want to delete/),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Test_priyanka (97654104VZJ)'),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByRole('button', { name: 'Cancel' });

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.DELETE}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={mockEscrowProvider[0]}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      const deleteButton = screen.queryByRole('button', { name: 'Delete' });

      expect(deleteButton).not.toBeDisabled();
      expect(deleteButton).toBeInTheDocument();

      fireEvent.click(deleteButton);

      expect(FundSourcesService.remove).toHaveBeenCalledWith(
        mockEscrowProvider[0].fundSourceId,
      );

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.INITIATE_PAYOUT_SUCCESS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={mockEscrowProvider[0]}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Transfer Successful')).toBeInTheDocument();

      expect(screen.queryByText(/UTR No.:/)).toBeInTheDocument();

      const closeButton = screen.queryByRole('button', { name: 'Close' });

      expect(closeButton).not.toBeDisabled();
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.INITIATE_PAYOUT_FAILED}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={mockEscrowProvider[0]}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Transfer Rejected')).toBeInTheDocument();

      const closeButton = screen.queryByRole('button', { name: 'Close' });

      expect(closeButton).not.toBeDisabled();
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.INITIATE_PAYOUT_PENDING}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={mockEscrowProvider[0]}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Transfer Pending')).toBeInTheDocument();

      const closeButton = screen.queryByRole('button', { name: 'Close' });

      expect(closeButton).not.toBeDisabled();
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.ALLOCATE_FUNDS_SUCCESS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={mockEscrowProvider[0]}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Funds Allocated Successfully'),
      ).toBeInTheDocument();

      expect(
        screen.queryByText(/₹ 0.00 were allocated to/),
      ).toBeInTheDocument();

      const closeButton = screen.queryByRole('button', { name: 'Close' });

      expect(closeButton).not.toBeDisabled();
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.ALLOCATE_FUNDS_FAILED}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={mockEscrowProvider[0]}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Funds Allocation Failed')).toBeInTheDocument();

      const closeButton = screen.queryByRole('button', { name: 'Close' });

      expect(closeButton).not.toBeDisabled();
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    const { getByTestId } = render(
      <Modals
        modalType={MODAL_TYPE.ALLOCATE_FUNDS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={mockEscrowProvider[0]}
      />,
      { wrapper: CustomWrapper },
    );

    expect(FundSourcesService.getBalance).toHaveBeenCalledWith(
      mockEscrowProvider[0].paymentInstrumentId,
    );

    await waitFor(() => {
      expect(
        screen.queryByText('What does allocate funds do?'),
      ).toBeInTheDocument();

      expect(screen.queryByText('Test_priyanka')).toBeInTheDocument();
      expect(screen.queryByText('97654104VZJ')).toBeInTheDocument();

      expect(screen.queryByText('erer')).toBeInTheDocument();
      expect(screen.queryByText('97654107BWT')).toBeInTheDocument();

      expect(screen.queryByText(/Escrow A\/c Balance:/)).toBeInTheDocument();
      expect(
        screen.queryByText('Maximum 200 characters allowed'),
      ).toBeInTheDocument();

      expect(screen.queryAllByText('Optional').length).toBe(2);
      expect(screen.queryAllByText('Select Virtual Account').length).toBe(2);
    });

    const submitButton = screen.queryByRole('button', { name: 'Submit' });

    expect(submitButton).toHaveClass('ml-4');
    expect(submitButton).toBeDisabled();

    const amountInput = getByTestId('amount').querySelector('input');
    const referenceIdInput = getByTestId('reference-id').querySelector('input');
    const remarksInput = getByTestId('remarks');

    await userEvent.type(amountInput, '100');
    expect(mockAmountValidation).toHaveBeenCalledTimes(3);

    await userEvent.type(referenceIdInput, 'foo');

    await userEvent.type(remarksInput, 'baz');
    expect(mockRemarksValidation).toHaveBeenCalledTimes(3);

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(setModalType).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    const { getByTestId } = render(
      <Modals
        modalType={MODAL_TYPE.INTERNAL_FUND_TRANSFER}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={mockEscrowProvider[0]}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Internal Fund Transfer')).toBeInTheDocument();

      expect(
        screen.queryByText('Test_priyanka (97654104VZJ)'),
      ).toBeInTheDocument();

      expect(screen.queryByText('erer')).toBeInTheDocument();
      expect(screen.queryByText('97654107BWT')).toBeInTheDocument();

      expect(screen.queryByText('Transferring From')).toBeInTheDocument();
      expect(screen.queryByText('₹ 60.00')).toBeInTheDocument();

      expect(
        screen.queryByText('Maximum 200 characters allowed'),
      ).toBeInTheDocument();

      expect(screen.queryByText('Optional')).toBeInTheDocument();
      expect(
        screen.queryByText('Choose a virtual account'),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', { name: 'Transfer' });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeDisabled();
    });

    const amountInput = getByTestId('amount').querySelector('input');
    const remarksInput = getByTestId('remarks');

    await userEvent.type(amountInput, '100');
    expect(mockAmountValidation).toHaveBeenCalledTimes(2);

    await userEvent.type(remarksInput, 'baz');
    expect(mockRemarksValidation).toHaveBeenCalledTimes(0);

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(setModalType).toHaveBeenCalled();
  });

  test('checks Row click', async () => {
    render(<VirtualAccounts />, { wrapper: CustomWrapper });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.ONE_ESCROW]}/${
        PATH_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]
      }/${PATH_BY_SUBMENU[SUBMENU.VIRTUAL_ACCOUNTS]}/${
        mockEscrowProvider[0].fundSourceId
      }/details`,
      {
        state: { rowDetails: mockEscrowProvider[0] },
      },
    );
  });
});
