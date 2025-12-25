import React from 'react';
import { render, screen } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';
import { BrowserRouter as Router } from 'react-router-dom';

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
  getAccountConfig: jest.fn(() => Promise.resolve({})),
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
  getFreeTrial: jest.fn(() =>
    Promise.resolve({
      data: {
        amount: '1.13',
        expiryDate: '2093-07-04 17:47:16',
        freeCreditsRedeemed: true,
      },
      status: 'SUCCESS',
    }),
  ),
  getFreeCreditRates: jest.fn(() =>
    Promise.resolve([
      {
        serviceName: 'test',
        rate: '1.52',
        isActive: 0,
        variableAmount: 0,
        addedOn: '2022-07-18T19:27:38+05:30',
        enableNameMatch: 0,
        enableSDK: 0,
      },
      {
        serviceName: 'test2',
        rate: '1',
        isActive: 0,
        variableAmount: 0,
        addedOn: '2022-07-20T11:56:55+05:30',
        enableNameMatch: 1,
        enableSDK: 0,
      },
      {
        serviceName: 'CIN_VERIFICATION',
        rate: '1.2',
        isActive: 0,
        variableAmount: 0,
        addedOn: '2022-01-07T15:00:00+05:30',
        enableNameMatch: 0,
        enableSDK: 0,
      },
      {
        serviceName: 'BAV_PENNILESS',
        rate: '1',
        isActive: 0,
        variableAmount: 0,
        addedOn: '2022-11-03T12:36:02+05:30',
        enableNameMatch: 1,
        enableSDK: 0,
      },
      {
        serviceName: 'BAV_ONEPAISA',
        rate: '1.1',
        isActive: 0,
        variableAmount: 0,
        addedOn: '2022-11-03T12:36:11+05:30',
        enableNameMatch: 1,
        enableSDK: 0,
      },
      {
        serviceName: 'CREDIT_SCOREV',
        rate: '20',
        isActive: 0,
        variableAmount: 0,
        addedOn: '2022-11-23T12:23:09+05:30',
        enableNameMatch: 0,
        enableSDK: 0,
      },
      {
        serviceName: 'BANKDETAILS_VALIDATION',
        rate: '3',
        isActive: 1,
        variableAmount: 0,
        addedOn: '2018-02-09T15:57:06+05:30',
        enableNameMatch: 1,
        enableSDK: 1,
      },
      {
        serviceName: 'UPIDETAILS_VALIDATION',
        rate: '1.2',
        isActive: 1,
        variableAmount: 0,
        addedOn: '2020-02-05T20:31:12+05:30',
        enableNameMatch: 0,
        enableSDK: 1,
      },
      {
        serviceName: 'PANDETAILS_VERIFICATION',
        rate: '2',
        isActive: 1,
        variableAmount: 0,
        addedOn: '2021-07-26T17:54:59+05:30',
        enableNameMatch: 1,
        enableSDK: 1,
      },
      {
        serviceName: 'AADHAAR_VERIFICATION',
        rate: '1.2',
        isActive: 1,
        variableAmount: 0,
        addedOn: '2022-01-07T15:00:00+05:30',
        enableNameMatch: 0,
        enableSDK: 0,
      },
      {
        serviceName: 'GSTIN_VERIFICATION',
        rate: '1',
        isActive: 1,
        variableAmount: 0,
        addedOn: '2022-02-27T01:17:16+05:30',
        enableNameMatch: 0,
        enableSDK: 0,
      },
      {
        serviceName: 'AADHAAR_OFFLINE_VERIFICATION',
        rate: '1',
        isActive: 1,
        variableAmount: 0,
        addedOn: '2022-08-08T13:57:12+05:30',
        enableNameMatch: 1,
        enableSDK: 0,
      },
      {
        serviceName: 'OFFLINE_AADHAAR_VERIFICATION',
        rate: '1.3',
        isActive: 1,
        variableAmount: 0,
        addedOn: '2022-08-23T16:08:42+05:30',
        enableNameMatch: 0,
        enableSDK: 1,
      },
      {
        serviceName: 'AADHAAR_OCR_V',
        rate: '2',
        isActive: 1,
        variableAmount: 0,
        addedOn: '2022-10-14T14:06:11+05:30',
        enableNameMatch: 0,
        enableSDK: 0,
      },
      {
        serviceName: 'PAN_OCR_V',
        rate: '1',
        isActive: 1,
        variableAmount: 0,
        addedOn: '2022-11-14T12:57:51+05:30',
        enableNameMatch: 0,
        enableSDK: 0,
      },
      {
        serviceName: 'CREDIT_SCORE_V',
        rate: '50',
        isActive: 1,
        variableAmount: 0,
        addedOn: '2022-11-23T12:20:41+05:30',
        enableNameMatch: 0,
        enableSDK: 0,
      },
      {
        serviceName: 'REVERSE_PENNY_DROP_V',
        rate: '2',
        isActive: 1,
        variableAmount: 0,
        addedOn: '2022-11-24T11:47:35+05:30',
        enableNameMatch: 0,
        enableSDK: 0,
      },
      {
        serviceName: 'IFSC_VERIFICATION',
        rate: '1.5',
        isActive: 1,
        variableAmount: 0,
        addedOn: '2022-12-27T01:38:12+05:30',
        enableNameMatch: 0,
        enableSDK: 0,
      },
    ]),
  ),
}));

jest.mock('services/misc', () => ({
  getAliasPermissions: jest.fn(() => Promise.resolve([])),
}));

describe('AccountProvider', () => {
  test('should make context value accessbile to Consumer', async () => {
    render(
      <Router>
        <Theme>
          <MerchantProvider>
            <AccountProvider>
              <AccountContext.Consumer>
                {({ accountInfo }) => (
                  <ul>
                    {Object.keys(accountInfo).map(key => (
                      <li>
                        {key}: {accountInfo[key]}
                      </li>
                    ))}
                  </ul>
                )}
              </AccountContext.Consumer>
            </AccountProvider>
          </MerchantProvider>
        </Theme>
      </Router>,
    );

    await screen.findByText('bankAccount: 111111111111');
  });
});
