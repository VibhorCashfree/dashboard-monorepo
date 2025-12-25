import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Store
import configureStore from 'redux/configureStore';

// Mocks
import { mockFundSources } from '__mocks__/common.mock';

// Providers
import { MerchantProvider } from '../MerchantProvider';
import { AccountContext, AccountProvider } from '../AccountProvider';

jest.mock('services/accounts', () => ({
  updateToken: jest.fn(() =>
    Promise.resolve({
      message: 'Token is valid!',
      data: {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9',
      },
      status: 'SUCCESS',
    }),
  ),
  getAccountInfo: jest.fn(() =>
    Promise.resolve({
      name: 'Raj Nandan Sharma',
      phone: '1234567890',
      email: 'kisley.shirish+cfmain@cashfree.com',
      state: 'Bengaluru',
      address: 'Koramangala',
      city: 'Ranchi',
      bankAccount: '111111111111',
      ifsc: 'ICIC0003439',
      accountHolder: 'sdfsdf',
      isActive: '1',
      bankname: 'ICICI',
    }),
  ),
  getMerchantSettings: jest.fn(() =>
    Promise.resolve({
      enableConnectedWallet: false,
      enableMerchantAPIKeyAddition: false,
    }),
  ),
  getAccountList: jest.fn(() =>
    Promise.resolve([
      {
        accountId: 7447,
        accountType: 'PAYOUT_CURRENT',
        accountName: 'Raj Nandan Sharma',
        rechargeAccount: '70707010J15S',
        availableBalance: '16.29',
      },
    ]),
  ),
  getActivationDetails: jest.fn(() =>
    Promise.resolve({
      data: {
        authType: 'OTP',
        userType: 'MERCHANT_OWNER',
        cfProductStatus: {
          CAC: 'APPROVED',
          CES: 'APPROVED',
          CSP: 'APPROVED',
          EPOS: 'APPROVED',
          PG: 'APPROVED',
        },
      },
    }),
  ),
  getMerchantRestrictions: jest.fn(() => Promise.resolve([])),
  getAccountConfig: jest.fn(() =>
    Promise.resolve({
      isConnected: false,
      selfWithdrawal: true,
      quickTransfer: true,
      transfers: {
        individual: '1',
        batch: '1',
        upload: true,
      },
      cashgrams: {
        activated: true,
        individual: '1',
        batch: '0',
        upload: true,
        verify: true,
      },
      beneficiaries: {
        upload: true,
      },
    }),
  ),
}));

jest.mock('services/misc', () => ({
  getAliasPermissions: jest.fn(() => Promise.resolve([])),
  getFeatureToggle: jest.fn(() => Promise.resolve([])),
}));

jest.mock('services/fundSources', () => ({
  getYesBusinessType: jest.fn(() =>
    Promise.resolve({ businessType: 'Partnership', connectAllowed: true }),
  ),
}));

const initialState = {
  fundSources: mockFundSources,
  downtimes: [],
  fetchFundSources: jest.fn(),
  fetchDowntimes: jest.fn(),
};

const store = configureStore(initialState);

describe('AccountProvider', () => {
  test('should make context value accessbile to Consumer', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Provider store={store}>
          <Theme>
            <MerchantProvider>
              <AccountProvider>
                <AccountContext.Consumer>
                  {({ accountInfo }) => (
                    <ul>
                      {Object.keys(accountInfo).map((key) => (
                        <li key={key}>
                          {key}: {accountInfo[key]}
                        </li>
                      ))}
                    </ul>
                  )}
                </AccountContext.Consumer>
              </AccountProvider>
            </MerchantProvider>
          </Theme>
        </Provider>
      </MemoryRouter>,
    );

    await screen.findByText('bankAccount: 111111111111');
  });
});
