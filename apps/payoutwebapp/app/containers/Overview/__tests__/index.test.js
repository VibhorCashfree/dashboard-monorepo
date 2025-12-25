import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { DetailsContext } from 'containers/FundSourceDetails/providers';

// Constants
import { FS_DISPLAY_TYPE } from 'constants/fundSources';

// Mocks
import { mockDetailsProvider } from '__mocks__/common.mock';

// Services
import * as AccountService from 'services/accounts';
import * as FundSourcesService from 'services/fundSources';

// Containers
import Overview from '..';

// Components
import Wrapper from '__tests__/components/Wrapper';
import ICICI from '../components/ICICI';
import YesBank from '../components/YesBank';
import OtherBanks from '../components/OtherBanks';
import CashfreeWallet from '../components/CashfreeWallet';
import ConnectedWallet from '../components/ConnectedWallet';
import AvailableBalanceCard from '../components/AvailableBalanceCard';
import LastRechargeCard from '../components/LastRechargeCard';
import LowBalanceThresholdCard from '../components/LowBalanceThresholdCard';
import OverdraftLimitCard from '../components/OverdraftLimitCard';
import RechargeSection from '../components/RechargeSection';

beforeEach(() => {
  jest.mock('services/fundSources');

  jest
    .spyOn(FundSourcesService, 'getServiceChargesCount')
    .mockImplementation(() =>
      Promise.resolve({
        count: 1,
      }),
    );

  jest
    .spyOn(FundSourcesService, 'connect')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'getRechargeBankAccounts')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'getLastRechargeDetails')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'getInternalTransfer')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'getLowBalanceThreshold')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(AccountService, 'getAccountManager')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In Overview Container', () => {
  test('checks render', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider value={mockDetailsProvider}>
          <Overview />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(FundSourcesService.getServiceChargesCount).toHaveBeenCalledWith(
        39240,
        expect.objectContaining({}),
      );

      expect(screen.queryByText('care@cashfree.com')).not.toBeInTheDocument();
      expect(screen.queryByText('CC-Nagaraj-Temp10')).toBeInTheDocument();
      expect(screen.queryByText('Cashfree Wallet')).not.toBeInTheDocument();
      expect(screen.queryByText('Uno Wallet')).not.toBeInTheDocument();
      expect(screen.queryByText('Connected Wallet')).not.toBeInTheDocument();
      expect(screen.queryByText('Paytm Wallet')).not.toBeInTheDocument();
      expect(screen.queryByText('Logesh')).toBeInTheDocument();
      expect(screen.queryByText('Active')).toBeInTheDocument();
    });
  });

  test('checks ExtendedDropdown actions', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider value={mockDetailsProvider}>
          <Overview />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      document.getElementsByClassName('ui dropdown')[0].click();

      document
        .getElementsByClassName('scrolling menu transition')[0]
        .children[0].click();

      expect(screen.queryByText('Update Details')).toBeInTheDocument();
    });
  });

  test('checks render', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider
          value={{
            details: {
              ...mockDetailsProvider.details,
              fsDisplayType: FS_DISPLAY_TYPE.CASHFREE_WALLET,
            },
          }}
        >
          <Overview />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.queryByText('CC-Nagaraj-Temp10')).toBeInTheDocument();
      expect(screen.queryByText('Cashfree Wallet')).toBeInTheDocument();
      expect(screen.queryByText('Logesh')).toBeInTheDocument();
      expect(screen.queryByText('Active')).toBeInTheDocument();
    });
  });

  test('checks render', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider
          value={{
            details: {
              ...mockDetailsProvider.details,
              fsDisplayType: FS_DISPLAY_TYPE.CONNECTED_WALLET,
            },
          }}
        >
          <Overview />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.queryByText('CC-Nagaraj-Temp10')).toBeInTheDocument();
      expect(screen.queryByText('Connected Wallet')).toBeInTheDocument();
      expect(screen.queryByText('Logesh')).toBeInTheDocument();
      expect(screen.queryByText('Active')).toBeInTheDocument();
    });
  });

  test('<OtherBanks />', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider value={mockDetailsProvider}>
          <OtherBanks />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.queryByText('CC-Nagaraj-Temp10')).toBeInTheDocument();
      expect(screen.queryByText('Corporate Credit Card')).toBeInTheDocument();
      expect(screen.queryByText('Logesh')).toBeInTheDocument();
      expect(screen.queryByText('Name of Bank')).toBeInTheDocument();
      expect(screen.queryByText('Active')).toBeInTheDocument();
    });
  });

  test('<ICICI />', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider value={mockDetailsProvider}>
          <ICICI />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.queryByText('CC-Nagaraj-Temp10')).toBeInTheDocument();
      expect(screen.queryByText('Bank Account')).toBeInTheDocument();
      expect(screen.queryByText('Alias')).toBeInTheDocument();
      expect(screen.queryByText('A/c No. and Name')).toBeInTheDocument();
      expect(screen.queryByText('Active')).toBeInTheDocument();
    });
  });

  test('<YesBank />', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider value={mockDetailsProvider}>
          <YesBank />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.queryByText('CC-Nagaraj-Temp10')).toBeInTheDocument();
      expect(screen.queryByText('Bank Account')).toBeInTheDocument();
      expect(screen.queryByText('Customer ID')).toBeInTheDocument();
      expect(screen.queryByText('A/c No. and Name')).toBeInTheDocument();
      expect(screen.queryByText('Active')).toBeInTheDocument();
    });
  });

  test('<CashfreeWallet />', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider value={mockDetailsProvider}>
          <CashfreeWallet />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(FundSourcesService.getRechargeBankAccounts).toHaveBeenCalledWith(
        39240,
      );
      expect(FundSourcesService.getLastRechargeDetails).toHaveBeenCalledWith(
        39240,
      );
      expect(FundSourcesService.getInternalTransfer).toHaveBeenCalledWith(
        39240,
      );
      expect(AccountService.getAccountManager).toHaveBeenCalledWith();

      expect(screen.queryByText('CC-Nagaraj-Temp10')).toBeInTheDocument();
      expect(screen.queryByText('Cashfree Wallet')).toBeInTheDocument();
      expect(screen.queryByText('Logesh')).toBeInTheDocument();
      expect(screen.queryByText('Active')).toBeInTheDocument();
    });
  });

  test('<ConnectedWallet />', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider value={mockDetailsProvider}>
          <ConnectedWallet />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(FundSourcesService.getLastRechargeDetails).toHaveBeenCalledWith(
        39240,
      );
      expect(FundSourcesService.getInternalTransfer).toHaveBeenCalledWith(
        39240,
      );
      expect(AccountService.getAccountManager).toHaveBeenCalledWith();

      expect(screen.queryByText('CC-Nagaraj-Temp10')).toBeInTheDocument();
      expect(screen.queryByText('Connected Wallet')).toBeInTheDocument();
      expect(screen.queryByText('Logesh')).toBeInTheDocument();
      expect(screen.queryByText('A/c No. / IFSC')).toBeInTheDocument();
      expect(screen.queryByText('Active')).toBeInTheDocument();
    });
  });

  test('<AvailableBalanceCard />', async () => {
    const onRecharge = jest.fn();

    render(
      <Wrapper>
        <DetailsContext.Provider value={mockDetailsProvider}>
          <AvailableBalanceCard
            showBalance
            availableBalance="100"
            balanceMeta={{ foo: 'bar' }}
            onRecharge={onRecharge}
          />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      const rechargeButton = screen.queryByRole('button', {
        name: 'Recharge',
      });

      expect(rechargeButton).toBeInTheDocument();
      expect(rechargeButton).not.toBeDisabled();

      fireEvent.click(rechargeButton);

      expect(onRecharge).toHaveBeenCalled();

      expect(
        screen.queryByText('(Account Balance - Funds on Hold + Overdraft)'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Available Balance')).toBeInTheDocument();
      expect(screen.queryByText('foo')).toBeInTheDocument();
      expect(screen.queryByText('bar')).toBeInTheDocument();
    });
  });

  test('<LastRechargeCard />', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider value={mockDetailsProvider}>
          <LastRechargeCard data={{ status: 'SUCCESS' }} />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Last Recharge')).toBeInTheDocument();
      expect(screen.queryByText('Success')).toBeInTheDocument();
      expect(screen.queryByText('View All')).toBeInTheDocument();
    });
  });

  test('<LowBalanceThresholdCard />', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider value={mockDetailsProvider}>
          <LowBalanceThresholdCard data={{ lowBalance: '100' }} />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Low Balance Threshold')).toBeInTheDocument();
      expect(screen.queryByText('₹ 100.00')).toBeInTheDocument();
      expect(screen.queryByText('Set Threshold')).toBeInTheDocument();
    });
  });

  test('<OverdraftLimitCard />', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider value={mockDetailsProvider}>
          <OverdraftLimitCard
            availableBalance={{
              availableBalance: '0',
              balance: '100',
              fundsOnHold: '0',
              lastUpdated: '',
              overdraft: '121',
            }}
            accountManager={{
              adminEmail: 'foo@bar.com',
            }}
          />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Overdraft Limit')).toBeInTheDocument();
      expect(screen.queryByText('₹ 0.00')).toBeInTheDocument();
      expect(screen.queryByText('foo@bar.com')).toBeInTheDocument();
    });
  });

  test('<RechargeSection />', async () => {
    render(
      <Wrapper>
        <DetailsContext.Provider value={mockDetailsProvider}>
          <RechargeSection
            accounts={[
              {
                name: 'Rohit Playground',
                accountNumber: '259620050705',
                ifsc: 'INDB0000008',
                bankName: 'Indusind bank',
              },
              {
                name: 'test',
                accountNumber: '2424274874',
                ifsc: 'ICIC0002233',
                bankName: 'ICICI',
              },
            ]}
          />
        </DetailsContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Recharge Account Details'),
      ).toBeInTheDocument();
      expect(screen.queryAllByText('Cashfree').length).toBe(2);
      expect(screen.queryByText('INDB0000008')).toBeInTheDocument();
      expect(screen.queryByText('2424274874')).toBeInTheDocument();
    });
  });
});
