import React from 'react';
import { render, screen } from '@testing-library/react';

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
        merchantId: 27,
        authType: 'OTP',
        userType: 'MERCHANT_OWNER',
      },
    }),
  ),
  getProductDetails: jest.fn(() =>
    Promise.resolve({
      data: {
        CAC: 'APPROVED',
        CES: 'APPROVED',
        CSP: 'APPROVED',
        EPOS: 'APPROVED',
        PG: 'APPROVED',
      },
    }),
  ),
}));

jest.mock('services/misc', () => ({
  getAliasPermissions: jest.fn(() => Promise.resolve([])),
}));

describe('MerchantProvider', () => {
  test('should make context value accessbile to Consumer', async () => {
    render(
      <MerchantProvider>
        <MerchantContext.Consumer>
          {({ activationDetails }) => (
            <ul>
              {Object.keys(activationDetails).map(key => (
                <li key={key}>
                  {key}: {activationDetails[key]}
                </li>
              ))}
            </ul>
          )}
        </MerchantContext.Consumer>
      </MerchantProvider>,
    );

    await screen.findByText('userType: MERCHANT_OWNER');
  });
});
