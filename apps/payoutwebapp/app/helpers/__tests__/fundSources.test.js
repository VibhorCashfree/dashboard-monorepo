// Helpers
import { getFundSourcesOptions, getFiltersConfig } from '../fundSources';

const fundSources = [
  {
    fundSourceId: 120,
    fsType: 'CONNECTED',
    fsDisplayType: 'BANK_ACCOUNT',
    paymentInstrumentId: 'PYTM_FT_102',
    displayName: 'PYTM_FT_102',
    fsDescription: 'Paytm Payment Instrument',
    accountHolderName: 'CASHFREE PAYMENTS PRIVATE LIMITED',
    isDefault: false,
    isPayoutWallet: false,
    isMainAccount: false,
    bankAccount: 'PAYTM',
    ifsc: 'PYTM0123456',
    cfBankId: 0,
    cfBankName: 'KOTAK',
    connBankName: 'KOTAK',
    cfBankType: '',
    cfCredId: 12,
    cfGatewayId: 6,
    preferences: [
      {
        property: 'FUND_SOURCE_WEIGHTAGE',
        value: '0',
      },
    ],
    fsBalance: {
      balance: '0',
      availableBalance: '0',
      fundsOnHold: '0',
      overdraft: '0',
      lastUpdated: '',
    },
    supportedModes: ['banktransfer'],
    status: 'ACTIVE',
    addedOn: '2021-01-15T00:00:00+05:30',
  },
  {
    fundSourceId: 101,
    fsType: 'CONNECTED',
    fsDisplayType: 'PAYTM_WALLET',
    paymentInstrumentId: 'PYTM_102',
    displayName: 'PYTM_102',
    fsDescription: 'This is a test fund source',
    accountHolderName: 'Cashfree Payout',
    isDefault: false,
    isPayoutWallet: false,
    isMainAccount: false,
    bankAccount: 'PAYTM',
    ifsc: 'PYTM0123456',
    cfBankId: 0,
    cfBankName: 'PAYTM_FS',
    connBankName: 'PAYTM_FS',
    cfBankType: '',
    cfCredId: 75,
    cfGatewayId: 28,
    preferences: [],
    fsBalance: {
      balance: '0',
      availableBalance: '0',
      fundsOnHold: '0',
      overdraft: '0',
      lastUpdated: '',
    },
    supportedModes: ['paytm'],
    status: 'DEACTIVATED',
    addedOn: '2020-08-12T18:41:45+05:30',
  },
];

describe('FundSources helpers', () => {
  test('getFundSourcesOptions()', () => {
    expect(getFundSourcesOptions(fundSources)).toMatchObject([
      {
        key: 120,
        text: 'PYTM_FT_102',
        value: 'PYTM_FT_102',
      },
    ]);
  });

  test('getFiltersConfig()', () => {
    expect(getFiltersConfig(fundSources)).toMatchObject({
      'Fund Source': {
        columns: 2,
      },
    });

    expect(
      getFiltersConfig(fundSources, {
        Status: {
          columns: 2,
          items: ['SUCCESS', 'PENDING', 'FAILED'],
        },
      }),
    ).toMatchObject({
      Status: {
        columns: 2,
        items: ['SUCCESS', 'PENDING', 'FAILED'],
      },
      'Fund Source': {
        columns: 2,
      },
    });
  });
});
