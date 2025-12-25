// Adapters
import accounts from '../accounts';

const { from } = accounts;

describe('accounts adapters', () => {
  test('from()', () => {
    expect(
      from({
        data: {
          AccountConfig: {},
          Preferences: [],
          modes: [],
          SlabCharges: [],
        },
      }),
    ).toStrictEqual({
      accountConfig: {},
      preferences: {
        beneficiaries: {
          purpose: {
            amazonUPI: false,
            corpCC: false,
            others: false,
          },
        },
        cashgrams: {
          activated: false,
          batch: undefined,
          individual: undefined,
          upload: false,
          verify: false,
        },
        enableAPI: true,
        enableOneEscrow: false,
        enableModeRouting: false,
        enablePrepaidCard: false,
        enableRouter: false,
        enableTransferTypes: false,
        enableVAOnConnectedFS: false,
        isConnected: false,
        isPostpaid: false,
        merchantPreferences: {
          AMAZON_UPI_BENE_NOTIFY_MEDIUM: undefined,
          BULK_UPLOADS_BENE: false,
          CASHGRAM_MERCHANT_NAME: undefined,
          CASHGRAM_REDIRECT_URL: undefined,
          CASHGRAM_SUPPORT_MAIL: undefined,
          CASHGRAM_TRANSFER_ENABLED: false,
          CASHGRAM_VALIDATION_BV_RATE: undefined,
          CASHGRAM_VALIDATION_CREATION_RATE: undefined,
          DISABLE_NEFT_RETRY: false,
          DISABLE_RETRY_TRANSFER_PAYOUT: false,
          INCIDENT_WEBHOOK_ENABLED: false,
          MAX_LOW_BALANCE_QUEUEING_TIME: undefined,
          PHONE_MODE_NAME_MATCH_THRESHOLD: undefined,
          TRANSFERS_MAX_RETRY_TIME: undefined,
        },
        modeByName: {},
        quickTransfer: false,
        rechargePercentage: 2.4,
        selfWithdrawal: false,
        transfers: {
          approve: false,
          batch: undefined,
          individual: undefined,
          upload: false,
        },
        webhookVersion: undefined,
      },
      slabCharges: [],
    });
  });
});
