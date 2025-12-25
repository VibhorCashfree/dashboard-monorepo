import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mocks
import { mockEscrowProvider } from '__mocks__/common.mock';

// Services
import * as FundSourcesService from 'services/fundSources';

// Providers
import { EscrowAccountContext } from 'pages/OneEscrow/providers';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Constants
import { MODAL_TYPE } from '../constants';

// Containers
import EscrowAccount from '../';

const mockNavigate = jest.fn();

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
  jest.mock('services/fundSources');

  jest
    .spyOn(FundSourcesService, 'createVirtualAccount')
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

describe('EscrowAccount Component', () => {
  test('renders correctly', async () => {
    render(
      <Wrapper>
        <EscrowAccountContext.Provider
          value={{
            virtualAccounts: mockEscrowProvider,
          }}
        >
          <EscrowAccount />
        </EscrowAccountContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(
        screen.queryByText(/No active escrow account found/),
      ).toBeInTheDocument();

      expect(screen.queryByText('care@cashfree.com')).toBeInTheDocument();
    });
  });

  test('renders correctly', async () => {
    render(<EscrowAccount />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(
        screen.queryByText(/No active escrow account found/),
      ).not.toBeInTheDocument();

      expect(screen.queryByText('care@cashfree.com')).not.toBeInTheDocument();

      expect(
        screen.queryByText('One Escrow - Escrow Account'),
      ).toBeInTheDocument();

      expect(screen.queryByText('Fund Source Name')).toBeInTheDocument();
      expect(screen.queryAllByText('Test_priyanka').length).toBe(2);
      expect(screen.queryByText('YES_b319d91')).toBeInTheDocument();
      expect(screen.queryByText('Name of Bank')).toBeInTheDocument();
      expect(screen.queryByText('Bank Account Name')).toBeInTheDocument();
      expect(screen.queryByText('john doe')).toBeInTheDocument();
      expect(screen.queryAllByText('Active').length).toBe(4);

      expect(
        screen.queryByText(/A\/c No.: 026291800000092/),
      ).toBeInTheDocument();

      expect(screen.queryByText(/(YESB0000262)/)).toBeInTheDocument();
      expect(screen.queryByText('₹ 0.00')).toBeInTheDocument();
      expect(screen.queryByText('₹ 60.00')).toBeInTheDocument();
      expect(screen.queryByText('₹ 100.00')).toBeInTheDocument();
      expect(screen.queryByText('₹ 1,503.00')).toBeInTheDocument();

      expect(screen.queryByText('Test_surjeet')).toBeInTheDocument();
      expect(screen.queryByText('97654104VZJ')).toBeInTheDocument();
      expect(screen.queryByText('Deactivated')).toBeInTheDocument();

      expect(screen.getAllByTestId('table-header-cell').length).toBe(6);

      const tab1 = screen.queryByText('Virtual Accounts');
      const tab2 = screen.queryByText('Escrow Statements');

      expect(tab1).toHaveClass('active');
      expect(tab2).not.toHaveClass('active');
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.CREATE_VIRTUAL_ACCOUNT_SUCCESS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Virtual Account Created Successfully'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Account Name')).toBeInTheDocument();
      expect(screen.queryByText('Virtual Account Number')).toBeInTheDocument();
      expect(screen.queryByText('Virtual IBAN')).not.toBeInTheDocument();
      expect(screen.queryByText(/YESB0000262/)).toBeInTheDocument();

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
        modalType={MODAL_TYPE.CREATE_VIRTUAL_ACCOUNT_FAILED}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Virtual Account Creation Failed'),
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
        modalType={MODAL_TYPE.INITIATE_PAYOUT_SUCCESS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
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
        modalType={MODAL_TYPE.CREATE_VIRTUAL_ACCOUNT}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Create Virtual Account (VA)'),
      ).toBeInTheDocument();

      expect(screen.queryByText('Account Prefix')).toBeInTheDocument();
      expect(screen.queryByText('Choose Escrow Account')).toBeInTheDocument();

      const [displayNameInput, accountPrefixInput /*bankAccountInput*/] =
        screen.queryAllByRole('textbox');

      expect(displayNameInput).toHaveAttribute('value', '');
      expect(accountPrefixInput).toHaveAttribute('value', '');
      //   expect(bankAccountInput).toHaveAttribute(
      //     'value',
      //     'YES_CONNECTED (026291800000092)',
      //   );
    });

    const submitButton = screen.queryByRole('button', { name: 'Submit' });

    expect(submitButton).toHaveClass('ml-4');
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.queryAllByRole('textbox')[0], {
      target: { value: 'xyz' },
    });
    fireEvent.change(screen.queryAllByRole('textbox')[1], {
      target: { value: 'Mr.' },
    });

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(FundSourcesService.createVirtualAccount).toHaveBeenCalledWith({
      displayName: 'xyz',
      accountPrefix: 'Mr.',
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.CREATE_VIRTUAL_ACCOUNT}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });
});
