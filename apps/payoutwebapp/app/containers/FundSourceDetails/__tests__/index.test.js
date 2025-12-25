import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Providers
import {
  DetailsProvider,
  DetailsContext,
} from 'containers/FundSourceDetails/providers';

// Mocks
import { mockDetailsProvider } from '__mocks__/common.mock';

// Services
import * as FundSourcesService from 'services/fundSources';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
} from 'constants/menuItems';

// Containers
import FundSourceDetails from '..';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Tabs from '../components/Tabs';

const renderer = new ShallowRenderer();

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    tabId: 'statements',
  }),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.mock('services/fundSources');

  jest.spyOn(FundSourcesService, 'getDetails').mockImplementation(() =>
    Promise.resolve({
      accountId: 0,
      fsType: 'PAYOUT_NODAL',
      fsDisplayType: 'CREDIT_CARD',
      fsDescription: null,
      accountHolderName: '',
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
      virtualAccount: '',
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
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <DetailsContext.Provider value={mockDetailsProvider}>
      {children}
    </DetailsContext.Provider>
  </Wrapper>
);

describe('In FundSourceDetails Container', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <FundSourceDetails />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('should make context value accessbile to Consumer', async () => {
    render(
      <Wrapper>
        <DetailsProvider>
          <DetailsContext.Consumer>
            {({ details }) => (
              <ul>
                <li>Card Network: {details.connectDetails.cardNetwork}</li>
                <li>FundSource Id: {details.fundSourceId}</li>
                <li>PaymentInstrument Id: {details.paymentInstrumentId}</li>
              </ul>
            )}
          </DetailsContext.Consumer>
        </DetailsProvider>
      </Wrapper>,
    );

    await screen.findByText('Card Network: mastercard');
    await screen.findByText('FundSource Id: 39240');
    await screen.findByText('PaymentInstrument Id: CREDIT_CARD_102_c5fecd2');
  });

  test('checks Tabs render', async () => {
    render(<Tabs />, { wrapper: CustomWrapper });

    await waitFor(
      () => {
        expect(screen.queryByText('Date & Time')).toBeInTheDocument();
        expect(screen.queryByText('Available Balance')).toBeInTheDocument();
        expect(screen.queryByText('Search & Filter')).toBeInTheDocument();
        expect(screen.queryByText('No data found!')).toBeInTheDocument();
        expect(screen.queryByText('Event Type')).toBeInTheDocument();
        expect(screen.queryByText('Debit')).toBeInTheDocument();
        expect(screen.queryByText('Remarks')).toBeInTheDocument();
        expect(
          screen.queryByText(/Statement for only 7 days can be viewed here./),
        ).toBeInTheDocument();
      },
      {
        timeout: 3000,
      },
    );
  });

  test('back button is functional', async () => {
    render(<FundSourceDetails />, { wrapper: Wrapper });

    await waitFor(() => {
      const backButton = screen.getByText('Back');
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${PATH_BY_SUBMENU[SUBMENU.ALL]}`,
    );
  });
});
