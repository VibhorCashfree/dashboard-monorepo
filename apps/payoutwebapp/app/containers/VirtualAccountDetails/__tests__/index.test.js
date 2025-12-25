import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Services
import * as FundSourcesService from 'services/fundSources';

// Mocks
import { mockEscrowProvider } from '__mocks__/common.mock';

// Providers
import { EscrowAccountContext } from 'pages/OneEscrow/providers';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';

// Containers
import VirtualAccountDetails from '../';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: '/',
    state: {
      rowDetails: {
        accountId: 0,
        fsType: 'PAYOUT_NODAL',
        fsDisplayType: 'CREDIT_CARD',
        fsDescription: null,
        accountHolderName: 'johnji',
        cfCredId: 0,
        cfBankId: 7,
        bankAccount: '',
        ifsc: '',
        sweepAccount: 0,
        isActive: 0,
        isPayoutWallet: true,
        isDefault: false,
        isMainAccount: false,
        walletCode: '',
        addedOn: '2022-09-14T15:24:45+05:30',
        displayName: 'CC-Nagaraj-Temp10',
        virtualAccount: 'gggggggg',
        status: 'ACTIVE',
        connBankName: '',
        merchantName: 'Logesh',
        connectDetails: {
          cardHolderName: '',
          cardNetwork: 'mastercard',
          cardNumber: 'XXXXXXXXXXXX2052',
          channel: '',
        },
        fundSourceId: 39240,
        paymentInstrumentId: 'CREDIT_CARD_102_c5fecd2',
        cfBankName: '',
        fsBalance: {
          balance: '19.44',
          availableBalance: '19.44',
          fundsOnHold: '0',
          overdraft: '0',
          lastUpdated: '',
        },
      },
    },
  }),
}));

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <EscrowAccountContext.Provider
      value={{ virtualAccounts: mockEscrowProvider }}
    >
      {children}
    </EscrowAccountContext.Provider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/fundSources');

  jest.spyOn(FundSourcesService, 'getBalance').mockImplementation(() =>
    Promise.resolve({
      balance: '66',
      availableBalance: '80',
      fundsOnHold: '0',
      overdraft: '0',
      lastUpdated: '2024-07-03 15:04:36',
    }),
  );

  jest
    .spyOn(FundSourcesService, 'getRechargeBankAccounts')
    .mockImplementation(() =>
      Promise.resolve([
        {
          accountNumber: '909110Q5NZ',
          ifsc: 'IDFB0020101',
          bankName: 'Yes bank',
        },
      ]),
    );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('VirtualAccountDetails Component', () => {
  test('renders correctly', async () => {
    render(<VirtualAccountDetails />, { wrapper: CustomWrapper });

    expect(
      screen.getByText(
        `${LABEL_BY_SUBMENU[SUBMENU.VIRTUAL_ACCOUNTS]} ${
          LABEL_BY_SUBMENU[SUBMENU.DETAILS]
        }`,
      ),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(FundSourcesService.getBalance).toHaveBeenCalledWith(
        'CREDIT_CARD_102_c5fecd2',
      );
      expect(FundSourcesService.getRechargeBankAccounts).toHaveBeenCalledWith(
        39240,
      );
    });

    await waitFor(() => {
      expect(screen.queryByText('CC-Nagaraj-Temp10')).toBeInTheDocument();
      expect(screen.queryByText(/gggggggg/)).toBeInTheDocument();
      expect(screen.queryByText(/IDFB0020101/)).toBeInTheDocument();
    });

    expect(screen.queryByText('Virtual Account Details')).toBeInTheDocument();
    expect(screen.queryByText('Account Balance')).toBeInTheDocument();
    expect(screen.queryByText('Active')).toBeInTheDocument();
    expect(screen.queryByText('₹ 19.44')).toBeInTheDocument();
  });

  test('navigates back when Back button is clicked', () => {
    render(<VirtualAccountDetails />, { wrapper: CustomWrapper });

    fireEvent.click(screen.getByText('Back'));

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.ONE_ESCROW]}/${
        PATH_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]
      }`,
    );
  });

  test('opens modals based on action', async () => {
    render(<VirtualAccountDetails />, { wrapper: CustomWrapper });

    await waitFor(() => {
      fireEvent.click(screen.queryByText('Actions'));

      expect(screen.queryByText('Internal Fund Transfer')).toBeInTheDocument();
      expect(screen.queryByText('Initiate Payout')).toBeInTheDocument();
      expect(screen.queryByText('Delete')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.queryByText('Internal Fund Transfer'));

    await waitFor(() => {
      expect(screen.queryByText('Transferring From')).toBeInTheDocument();
    });
  });

  test('opens modals based on action', async () => {
    render(<VirtualAccountDetails />, { wrapper: CustomWrapper });

    await waitFor(() => {
      fireEvent.click(screen.queryByText('Actions'));
    });

    fireEvent.click(screen.queryByText('Initiate Payout'));
  });

  test('back button is functional', () => {
    render(<VirtualAccountDetails />, { wrapper: CustomWrapper });

    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.ONE_ESCROW]}/${
        PATH_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]
      }`,
    );
  });
});
