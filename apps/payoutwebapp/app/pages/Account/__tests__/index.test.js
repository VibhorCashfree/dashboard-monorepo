import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Services
import * as AccountService from 'services/accounts';

// Mocks
import {
  mockAccountProvider,
  mockMerchantProvider,
} from '__mocks__/common.mock';

// Pages
import Account from '..';

const renderer = new ShallowRenderer();

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => (
  <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
    <Theme>
      <MerchantContext.Provider value={mockMerchantProvider}>
        <AccountContext.Provider value={mockAccountProvider}>
          {children}
        </AccountContext.Provider>
      </MerchantContext.Provider>
    </Theme>
  </MemoryRouter>
);

beforeEach(() => {
  jest.mock('services/accounts');

  jest
    .spyOn(AccountService, 'getRegisteredBankAccounts')
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

describe('In Account page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(<Wrapper />);

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<Account />, { wrapper: Wrapper });

    expect(AccountService.getRegisteredBankAccounts).toHaveBeenCalled();

    await waitFor(() => {
      expect(
        screen.queryByText('How does Account section help?'),
      ).toBeInTheDocument();
      expect(screen.queryAllByText('Raj Nandan Sharma').length).toBe(2);
      expect(
        screen.queryByText('kisley.shirish+cfmain@cashfree.com'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Koramangala')).toBeInTheDocument();
      expect(
        screen.queryByText(
          '*Self Withdrawal will be processed to this account',
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText('Primary Account')).toBeInTheDocument();
      expect(screen.queryByText('INDB0000008')).toBeInTheDocument();
      expect(
        screen.queryByText(
          /Recharges will be accepted from the below bank accounts only/,
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText('2424274874')).toBeInTheDocument();
      expect(screen.queryByText('care@cashfree.com')).toBeInTheDocument();
    });
  });
});
