import _get from 'lodash/get';

// Adapters
import accountsAdapter from 'adapters/accounts';

// Utils
import http from 'utils/http';
import { getQueryString, getBaseURL } from 'utils/common';

// Constants
import { USER_TYPE } from 'constants/common';

export const updateToken = async (accountId: string) => {
  try {
    type Response = {
      data: {
        token: string;
      };
    };

    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'common/updatetoken',
      method: 'PUT',
      data: {
        accountId: accountId,
      },
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAccountList = async (queryObj = {}) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      data: Account[];
    };

    const response: unknown = await http.get(`payout/payout-ids?${queryStr}`);

    return (response as Response).data;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAccountInfo = async () => {
  try {
    type Response = AccountInfo;

    const response: unknown = await http.get('payout/accountInfo');

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAccountConfig = async () => {
  try {
    type Response = {
      data: {
        AccountConfig: {
          MerchantID: number;
          CfBankID: number;
          AccountType: string;
          AccountHolder: string;
          Balance: string;
          FundsOnHold: string;
          Overdraft: string;
          CfBankName: string;
          MerchantName: string;
          MerchantPhone: string;
          MerchantLogo: string;
          MerchantSiteUrl: string;
          BankAccount: string;
          Ifsc: string;
          MerchantEmail: string;
          AvailableBalance: string;
          Prefix: string;
          WalletCode: string;
          Timezone: string;
        };
        Preferences: Array<{
          Property: string;
          Value: string;
        }>;
        modes: AccountConfigMode[];
        SlabCharges: AccountSlabCharge;
      };
    };

    const response: unknown = await http.get('payout/accountConfig');
    return accountsAdapter.from(response as Response);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getRegisteredBankAccounts = async () => {
  try {
    type Response = {
      entries: Array<{
        name: string;
        bankAccount: string;
        ifsc: string;
        bankName: string;
      }>;
    };

    const response: unknown = await http.get('payout/bankAccountDetails');

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const internalTransfer = async (body: AnyObject) => {
  try {
    type Response = { status: string };

    const response: unknown = await http.post('payout/internalTransfer', body);

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const logout = async () => {
  try {
    await http({
      baseURL: getBaseURL(true),
      url: 'common/user/logout',
      method: 'POST',
    });

    localStorage.clear();

    document.cookie =
      'token=;expires=Thu 01 Jan 1970;domain=cashfree.com;path=/;';

    window.location.href = process.env.LEGACY_APP as string;
  } catch (error) {
    return {
      error,
    };
  }
};

export const requestProductActivation = async (body: AnyObject) => {
  try {
    const response = await http({
      baseURL: getBaseURL(true),
      url: 'common/onboardingsvc/merchant/product-preferences?addProduct=true',
      data: body,
      method: 'POST',
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getPitchCardDetails = async () => {
  try {
    type Response = {
      message: string;
      data: {
        isOnboarded: boolean;
        productCards: {
          cta: string;
          description?: string;
          docLink?: string;
          productCode: string;
          productDashboardAccess: boolean;
          productName: string;
          testEnvAccess: boolean;
          title?: string;
        }[];
      };
      status: string;
    };

    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'common/onboardingsvc/product-card',
      method: 'GET',
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getActivationDetails = async () => {
  try {
    type Response = {
      data: {
        accountAlias: string;
        aliasEmail: string;
        role: string;
        userId: number;
        accountId: number;
        merchantId: number;
        name: string;
        userType: USER_TYPE;
        authType: string;
        email: string;
        cfProductStatus: {
          CSP: string;
        };
      };
    };

    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'common/validate/token',
      method: 'GET',
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const get2FASettings = async () => {
  try {
    type Response = AuthSettings;

    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'common/2fa/settings',
      method: 'GET',
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAccountManager = async () => {
  try {
    type Response = {
      data: {
        status: string;
        accountManager: AccountManager;
      };
      status: string;
    };

    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'common/onboarding/status',
      method: 'GET',
    });

    return (response as Response).data.accountManager;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getMerchantSettings = async () => {
  try {
    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'common/merchant/settings',
      method: 'GET',
    });

    const settings = {
      enableConnectedWallet: Boolean(
        +_get(response, 'data.ENABLE_CONNECTED_WALLET', 0),
      ),
      enableMerchantAPIKeyAddition: Boolean(
        +_get(response, 'data.ENABLE_MERCHANT_APIKEY_ADDITION', 0),
      ),
    };

    return settings;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getMerchantRestrictions = async () => {
  try {
    type Response = {
      restrictionCodes: number[];
    };

    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'common/restrictions',
      method: 'GET',
    });

    return (response as Response).restrictionCodes;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getMerchantPreference = async () => {
  try {
    type Response = {
      ipCheckDisabled: '0' | '1';
    };

    const response: unknown = await http.get('payout/merchantPreference');

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const setMerchantPreference = async (body: AnyObject) => {
  try {
    type Response = {
      merchantPreferenceUpdated: boolean;
    };

    const response: unknown = await http.patch(
      'payout/merchantPreference',
      body,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};
