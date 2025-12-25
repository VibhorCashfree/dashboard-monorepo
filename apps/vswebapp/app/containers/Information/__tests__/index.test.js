import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// Services
import * as AccountsService from 'services/accounts';

// Components
import Wrapper from '__tests__/components/Wrapper';
import RegisteredAccountDetails from '../components/RegisteredAccountDetails';

// Containers
import Information from '..';

beforeEach(() => {
  jest.mock('services/accounts');

  jest
    .spyOn(AccountsService, 'getRegisteredBankAccounts')
    .mockImplementation(() =>
      Promise.resolve({
        entries: [
          {
            name: 'Rohit Playground',
            bankAccount: '259620050705',
            ifsc: 'INDB0000008',
            bankName: 'Indusind bank',
          },
          {
            name: 'test',
            bankAccount: '2424274874',
            ifsc: 'ICIC0002233',
            bankName: 'ICICI',
          },
        ],
      }),
    );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In Information Container', () => {
  test('checks render', async () => {
    render(<Information />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('Account Details')).toBeInTheDocument();
      expect(screen.queryByText('Raj Nandan Sharma')).toBeInTheDocument();
      expect(
        screen.queryByText('kisley.shirish+cfmain@cashfree.com'),
      ).toBeInTheDocument();

      expect(screen.queryByText('Registered Bank Account Details'));
      expect(screen.queryByText('care@cashfree.com'));
      expect(screen.queryByText('Ranchi'));
    });
  });

  test('checks render', async () => {
    render(<RegisteredAccountDetails />, { wrapper: Wrapper });

    expect(AccountsService.getRegisteredBankAccounts).toHaveBeenCalled();

    await waitFor(() => {
      expect(
        screen.queryByText(
          '*Self Withdrawal will be processed to this account',
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText('Primary Account')).toBeInTheDocument();
      expect(screen.queryByText('INDB0000008')).toBeInTheDocument();
      expect(screen.queryByText('2424274874')).toBeInTheDocument();
    });
  });
});
