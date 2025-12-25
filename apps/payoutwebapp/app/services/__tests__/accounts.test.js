import MockAdapter from 'axios-mock-adapter';

// Constants
import { MOCK_ERROR } from 'constants/errors';

// Utils
import http from 'utils/http';

// Services
import * as AccountsService from 'services/accounts';

// Create a new instance of the axios mock adapter
const httpMock = new MockAdapter(http);

afterEach(() => {
  httpMock.reset();
});

describe('accounts services', () => {
  test('[SUCCESS] updateToken()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPut('common/updatetoken').reply(200, mockResponse);

    const response = await AccountsService.updateToken(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] updateToken()', async () => {
    httpMock.onPut('common/updatetoken').reply(404);

    const response = await AccountsService.updateToken(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAccountList()', async () => {
    const mockResponse = { data: [] };

    httpMock.onGet('payout/payout-ids?foo=bar&').reply(200, mockResponse);

    const response = await AccountsService.getAccountList({ foo: 'bar' });

    expect(response).toEqual(mockResponse.data);
  });

  test('[ERROR] getAccountList()', async () => {
    httpMock.onGet('payout/payout-ids?foo=bar&').reply(404);

    const response = await AccountsService.getAccountList({ foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAccountInfo()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onGet('payout/accountInfo').reply(200, mockResponse);

    const response = await AccountsService.getAccountInfo();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getAccountInfo()', async () => {
    httpMock.onGet('payout/accountInfo').reply(404);

    const response = await AccountsService.getAccountInfo();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAccountConfig()', async () => {
    const mockResponse = {
      data: { AccountConfig: {}, Preferences: [], modes: [], SlabCharges: [] },
    };

    httpMock.onGet('payout/accountConfig').reply(200, mockResponse);

    const response = await AccountsService.getAccountConfig();

    expect(response).toEqual({
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

  test('[ERROR] getAccountConfig()', async () => {
    httpMock.onGet('payout/accountConfig').reply(404);

    const response = await AccountsService.getAccountConfig();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getRegisteredBankAccounts()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onGet('payout/bankAccountDetails').reply(200, mockResponse);

    const response = await AccountsService.getRegisteredBankAccounts();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getRegisteredBankAccounts()', async () => {
    httpMock.onGet('payout/bankAccountDetails').reply(404);

    const response = await AccountsService.getRegisteredBankAccounts();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] internalTransfer()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/internalTransfer').reply(200, mockResponse);

    const response = await AccountsService.internalTransfer();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] internalTransfer()', async () => {
    httpMock.onPost('payout/internalTransfer').reply(404);

    const response = await AccountsService.internalTransfer();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] requestProductActivation()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onPost(
        'common/onboardingsvc/merchant/product-preferences?addProduct=true',
      )
      .reply(200, mockResponse);

    const response = await AccountsService.requestProductActivation();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] requestProductActivation()', async () => {
    httpMock
      .onPost(
        'common/onboardingsvc/merchant/product-preferences?addProduct=true',
      )
      .reply(404);

    const response = await AccountsService.requestProductActivation();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getActivationDetails()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onGet('common/validate/token').reply(200, mockResponse);

    const response = await AccountsService.getActivationDetails();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getActivationDetails()', async () => {
    httpMock.onGet('common/validate/token').reply(404);

    const response = await AccountsService.getActivationDetails();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAccountManager()', async () => {
    const mockResponse = { data: { accountManager: 'bar' } };

    httpMock.onGet('common/onboarding/status').reply(200, mockResponse);

    const response = await AccountsService.getAccountManager();

    expect(response).toEqual(mockResponse.data.accountManager);
  });

  test('[ERROR] getAccountManager()', async () => {
    httpMock.onGet('common/onboarding/status').reply(404);

    const response = await AccountsService.getAccountManager();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getMerchantSettings()', async () => {
    const mockResponse = { data: { ENABLE_CONNECTED_WALLET: '0' } };

    httpMock.onGet('common/merchant/settings').reply(200, mockResponse);

    const response = await AccountsService.getMerchantSettings();

    expect(response).toEqual({
      enableConnectedWallet: false,
      enableMerchantAPIKeyAddition: false,
    });
  });

  test('[ERROR] getMerchantSettings()', async () => {
    httpMock.onGet('common/merchant/settings').reply(404);

    const response = await AccountsService.getMerchantSettings();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getMerchantRestrictions()', async () => {
    const mockResponse = { restrictionCodes: [] };

    httpMock.onGet('common/restrictions').reply(200, mockResponse);

    const response = await AccountsService.getMerchantRestrictions();

    expect(response).toEqual(mockResponse.restrictionCodes);
  });

  test('[ERROR] getMerchantRestrictions()', async () => {
    httpMock.onGet('common/restrictions').reply(404);

    const response = await AccountsService.getMerchantRestrictions();

    expect(response).toEqual({ error: MOCK_ERROR });
  });
});
