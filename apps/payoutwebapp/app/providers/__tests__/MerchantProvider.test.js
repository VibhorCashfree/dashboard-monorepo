import React from 'react';
import { render, screen } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext, MerchantProvider } from '../MerchantProvider';

jest.mock('services/accounts', () => ({
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
          CES: 'REJECTED',
          CSP: 'APPROVED',
          EPOS: 'APPROVED',
          PG: 'APPROVED',
        },
      },
    }),
  ),
  getMerchantSettings: jest.fn(() =>
    Promise.resolve({
      enableConnectedWallet: false,
      enableMerchantAPIKeyAddition: false,
    }),
  ),
  getMerchantRestrictions: jest.fn(() => Promise.resolve([])),
}));

jest.mock('services/misc', () => ({
  getAliasPermissions: jest.fn(() => Promise.resolve([])),
  getFeatureToggle: jest.fn(() => Promise.resolve([])),
}));

describe('MerchantProvider', () => {
  test('should make context value accessbile to Consumer', async () => {
    render(
      <Theme>
        <MerchantProvider>
          <MerchantContext.Consumer>
            {({ merchantDetails }) => (
              <ul>
                <li>userType: {merchantDetails.userType}</li>
                <li>CES: {merchantDetails.cfProductStatus.CES}</li>
              </ul>
            )}
          </MerchantContext.Consumer>
        </MerchantProvider>
      </Theme>,
    );

    await screen.findByText('userType: MERCHANT_OWNER');
    await screen.findByText('CES: REJECTED');
  });
});
