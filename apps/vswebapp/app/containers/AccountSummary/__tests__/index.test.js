import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// Services
import * as AccountsService from 'services/accounts';

// Components
import Wrapper from '__tests__/components/Wrapper';
import AvailableBalanceCard from '../components/AvailableBalanceCard';
import LastRechargeCard from '../components/LastRechargeCard';
import LowBalanceThresholdCard from '../components/LowBalanceThresholdCard';
import RechargeSection from '../components/RechargeSection';

// Containers
import AccountSummary from '..';

beforeEach(() => {
  jest.mock('services/accounts');

  jest
    .spyOn(AccountsService, 'getRechargeBankAccounts')
    .mockImplementation(() => Promise.resolve([]));

  jest
    .spyOn(AccountsService, 'getLastRechargeDetails')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(AccountsService, 'getLowBalanceThreshold')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In AccountSummary Container', () => {
  test('checks render', async () => {
    render(<AccountSummary />, { wrapper: Wrapper });

    expect(AccountsService.getRechargeBankAccounts).toHaveBeenCalledWith(
      516730,
    );
    expect(AccountsService.getLastRechargeDetails).toHaveBeenCalledWith(516730);
    expect(AccountsService.getLowBalanceThreshold).toHaveBeenCalledWith({
      fundSourceId: 516730,
    });

    await waitFor(() => {
      const button = screen.queryByRole('button', {
        name: 'Withdraw',
      });

      expect(button).not.toBeDisabled();
      expect(button).toHaveClass('m-0');

      expect(screen.queryByText('Last Withdrawal')).toBeInTheDocument();
      expect(screen.queryByText('Last Recharge')).toBeInTheDocument();
      expect(screen.queryByText('Set Threshold')).toBeInTheDocument();
      expect(screen.queryByText('Low Balance Threshold')).toBeInTheDocument();
      expect(screen.queryByText('Overdraft Balance')).toBeInTheDocument();
      expect(screen.queryByText('Funds on Hold')).toBeInTheDocument();
    });
  });

  test('<AvailableBalanceCard />', async () => {
    render(
      <AvailableBalanceCard
        isWallet
        balance={{
          availableBalance: '5344.66',
          balance: '5541.66',
          overdraft: '0',
          fundsOnHold: '197',
        }}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('(Account Balance - Funds on Hold + Overdraft)'),
      ).toBeInTheDocument();
      expect(screen.queryByText('₹ 5,541.66')).toBeInTheDocument();
      expect(screen.queryByText('Funds on Hold')).toBeInTheDocument();
      expect(screen.queryByText('₹ 197.00')).toBeInTheDocument();
      expect(screen.queryByText('Overdraft Balance')).toBeInTheDocument();
      expect(screen.queryByText('₹ 0.00')).toBeInTheDocument();
    });
  });

  test('<LastRechargeCard />', async () => {
    render(
      <LastRechargeCard
        enableLink
        data={{
          amount: '5000',
          utr: 'foobar',
          depositTime: '2023-01-30T16:48:07+05:30',
        }}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Last Recharge')).toBeInTheDocument();
      expect(screen.queryByText('₹ 5,000.00')).toBeInTheDocument();
      expect(screen.queryByText('foobar')).toBeInTheDocument();
      expect(screen.queryByText(/30 Jan 2023/)).toBeInTheDocument();
    });
  });

  test('<LowBalanceThresholdCard />', async () => {
    render(
      <LowBalanceThresholdCard data={{ lowBalance: '3000', isActive: true }} />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Set Threshold')).toHaveClass('link');
      expect(screen.queryByText('₹ 3,000.00')).toBeInTheDocument();
      expect(screen.queryByText('Low Balance Threshold')).toBeInTheDocument();
      expect(
        screen.queryByText(/You will be notified via email/),
      ).toBeInTheDocument();
    });
  });

  test('<RechargeSection />', async () => {
    render(
      <RechargeSection
        accounts={[
          {
            accountNumber: '909110050705',
            ifsc: 'IDFB0000008',
            bankName: 'IDFC First bank',
          },
        ]}
      />,
      {
        wrapper: Wrapper,
      },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Recharge Account Details'),
      ).toBeInTheDocument();
      expect(screen.queryByText("A/c Holder's Name")).toBeInTheDocument();
      expect(screen.queryByText(/RTGS\/NEFT\/IMPS/)).toBeInTheDocument();
      expect(screen.queryByText('909110050705')).toBeInTheDocument();
      expect(screen.queryByText('IDFB0000008')).toBeInTheDocument();
    });
  });
});
