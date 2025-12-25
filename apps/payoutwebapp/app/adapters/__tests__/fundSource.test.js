// Adapters
import fundSource from '../fundSource';

// Mocks
import { mockDetailsProvider } from '__mocks__/common.mock';

const { from } = fundSource;

describe('fundSource adapters', () => {
  test('from()', () => {
    expect(from(mockDetailsProvider.details)).toMatchObject({
      fundSourceId: undefined,
      paymentInstrumentId: undefined,
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
      virtualAccount: 'john@987',
      status: 'ACTIVE',
      connBankName: '',
      merchantName: 'Logesh',
      connectDetails: {
        cardHolderName: '',
        cardNetwork: 'mastercard',
        cardNumber: 'XXXXXXXXXXXX2052',
        channel: '',
      },
    });
  });
});
