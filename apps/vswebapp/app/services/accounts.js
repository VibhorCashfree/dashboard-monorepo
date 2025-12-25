import _keyBy from 'lodash/keyBy';
import _mapValues from 'lodash/mapValues';
import _get from 'lodash/get';
import _filter from 'lodash/filter';

// Adapters
import freeTrialAdapter from 'adapters/freeTrial';
import rechargeAccountsAdapter from 'adapters/rechargeAccounts';
import listingAdapter from 'adapters/listing';

// Utils
import http from 'utils/http';
import { getCommonURL, getQueryString, getPayoutURL } from 'utils/common';
import Token from 'utils/token';
import AccountIdUtil from 'utils/accountId';

export const updateToken = async accountId => {
  try {
    const response = await http({
      method: 'PUT',
      baseURL: getCommonURL(),
      url: 'common/updatetoken',
      data: {
        accountId: accountId.toString(),
      },
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const refreshToken = async () => {
  try {
    const refreshTokenValue = localStorage.getItem('refreshToken');

    if (!refreshTokenValue) {
      throw new Error('No refresh token available');
    }

    const response = await http({
      method: 'GET',
      baseURL: getCommonURL(),
      url: 'common/token/refresh',
      headers: {
        'CF-REFRESH-TOKEN': refreshTokenValue,
        Authorization: `Bearer ${Token.get()}`,
      },
    });

    const newAccessToken = _get(response, 'data.data.accessToken', '');
    const newRefreshToken = _get(response, 'data.data.refreshToken', '');

    if (newAccessToken) {
      Token.set(newAccessToken);
    }
    if (newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken);
    }
    localStorage.deleteItem(AccountIdUtil.getKey());

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAccountList = async () => {
  try {
    const response = await http.get('common/verification-suite-ids');

    return _get(response, 'data', []);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getStatements = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(`payout/accountStatement?${queryStr}`);
    return listingAdapter.from(response.batches, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getStatementsCount = async queryObj => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(
      `payout/accountStatement/count?${queryStr}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAvailableBalance = async paymentInstrumentID => {
  try {
    const response = await http.get(
      `payout/paymentInstruments/${paymentInstrumentID}/balance`,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getLastRechargeDetails = async id => {
  try {
    const response = await http.get(
      `payout/paymentInstruments/${id}/lastRechargeDetails`,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getLowBalanceThreshold = async queryObj => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(`payout/lowBalanceThreshold?${queryStr}`);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const setLowBalanceThreshold = async (queryObj, body) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.post(
      `payout/lowBalanceThreshold?${queryStr}`,
      body,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAccountInfo = async () => {
  try {
    const response = await http.get('payout/accountInfo');
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAccountConfig = async () => {
  try {
    const response = await http.get('common/merchant/vrs/accountConfig');

    const accountType = _get(response, 'data.AccountConfig.AccountType', '');

    const preferences = _mapValues(
      _keyBy(response.data.Preferences, 'Property'),
      'Value',
    );

    const validationPreferences = _mapValues(
      _keyBy(response.data.ValidationPreference, 'ServiceName'),
      () => true,
    );

    const nameMatchPreferences = _get(
      response,
      'data.ValidationPreference',
    ).reduce((acc, current) => {
      acc[current.ServiceName] = current.EnableNameMatch;
      return acc;
    }, {});

    const getfundSourceDetails = () => {
      const fundSourceDetails = _get(response.data, 'fundSourceDetails', []);

      const vrsWallet = _filter(fundSourceDetails, {
        product: 'VRS',
      });

      const payoutsWallet = fundSourceDetails.filter(
        fundSource => fundSource.fsType !== 'CONNECTED',
      );

      if (vrsWallet.length) {
        return vrsWallet[0];
      }

      if (payoutsWallet.length) {
        return payoutsWallet[0];
      }

      return fundSourceDetails[0];
    };

    return {
      fundSourceDetails: getfundSourceDetails(),
      isConnected: accountType === 'CONNECTED_BANK',
      selfWithdrawal: Boolean(+preferences.ENABLE_SELF_WITHDRAWAL),
      enableNameMatch: Boolean(+preferences.VRS_ENABLE_NAME_MATCH),
      showAmountDeposited: Boolean(+preferences.SHOW_AMOUNT_DEPOSITED),
      rechargePercentage: +preferences.CC_FUNDSOURCE_CHARGE_PERCENTAGE || 2.4,
      enableAPI: preferences.ENABLE_API
        ? Boolean(+preferences.ENABLE_API)
        : true,
      activated: {
        bav: validationPreferences.BANKDETAILS_VALIDATION,
        upi: validationPreferences.UPIDETAILS_VALIDATION,
        'upi-mobile': validationPreferences.UPI_MOBILE_V,
        pan: validationPreferences.PANDETAILS_VERIFICATION,
        okyc: validationPreferences.OFFLINE_AADHAAR_VERIFICATION,
        gstIn: validationPreferences.GSTIN_VERIFICATION,
        ifsc: validationPreferences.IFSC_VERIFICATION,
        'aadhaar-ocr': validationPreferences.AADHAAR_OCR_V,
        'pan-ocr': validationPreferences.PAN_OCR_V,
        'bav-rpd': validationPreferences.REVERSE_PENNY_DROP_V,
        'pan-360': validationPreferences.PAN_ADVANCE,
        'upi-360': validationPreferences.UPI_ADVANCE,
        digilocker: validationPreferences.DGL_AADHAAR,
        esign: validationPreferences.ESIGN_VRS,
        RC: validationPreferences.VEHICLE_RC,
        'driving-license': validationPreferences.DRIVING_LICENSE,
        'pan-gstin': validationPreferences.PAN_TO_GSTIN,
        passport: validationPreferences.PASSPORT,
        'face-match': validationPreferences.FACE_MATCH,
        'name-match': validationPreferences.NAME_MATCH,
        cin: validationPreferences.CIN,
        'reverse-geocoding': validationPreferences.REVERSE_GEOCODING,
        'voter-id': validationPreferences.VOTER_ID,
        'aadhaar-masking': validationPreferences.AADHAAR_MASKING,
        liveliness: validationPreferences.LIVELINESS,
        'advance-employment': validationPreferences.ADVANCE_EMPLOYMENT,
        'ip-verification': validationPreferences.IP_VERIFICATION,
        'pan-lite': validationPreferences.PAN_LITE,
        'mobile-360': validationPreferences.MOBILE_360_LITE,
      },
      bav: {
        batch: preferences.BULK_UPLOADS_BAV_APPROVAL,
        upload: Boolean(+preferences.ENABLE_BULK_UPLOADS_BAV),
        nameMatch: nameMatchPreferences.BANKDETAILS_VALIDATION,
      },
      upi: {
        upload: Boolean(+preferences.ENABLE_BULK_UPLOADS_UPI),
        nameMatch: nameMatchPreferences.UPIDETAILS_VALIDATION,
      },
      pan: {
        upload: Boolean(+preferences.ENABLE_BULK_UPLOADS_PAN),
        nameMatch: nameMatchPreferences.PANDETAILS_VERIFICATION,
      },
      forms: {
        upload: Boolean(+preferences.ENABLE_BULK_UPLOADS_VRS_FORMS),
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export const getSelfWithdrawals = async id => {
  try {
    const response = await http.get(
      `payout/paymentInstruments/${id}/recentSelfWithdrawals`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getRegisteredBankAccounts = async () => {
  try {
    const response = await http.get('payout/bankAccountDetails');
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getRechargeBankAccounts = async id => {
  try {
    const response = await http.get(
      `payout/paymentInstruments/${id}/rechargeBankAccountDetails`,
    );
    return rechargeAccountsAdapter.from(response.entries);
  } catch (error) {
    return {
      error,
    };
  }
};

export const internalTransfer = async body => {
  try {
    const response = await http.post('payout/internalTransfer', body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const selfWithdrawals = async body => {
  try {
    const response = await http.post('payout/selfWithdrawals', body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const logout = async () => {
  try {
    await http({
      method: 'POST',
      baseURL: getCommonURL(),
      url: 'common/user/logout',
    });
    localStorage.clear();
    document.cookie =
      'token=;expires=Thu 01 Jan 1970;domain=cashfree.com;path=/;';

    window.location.href = process.env.LEGACY_APP;
  } catch (error) {
    return {
      error,
    };
  }
};

export const requestProductActivation = async () => {
  try {
    const response = await http({
      method: 'POST',
      baseURL: getCommonURL(),
      url: 'common/product/request/activate',
      data: {
        productId: 'VRS',
      },
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getActivationDetails = async () => {
  try {
    const response = await http({
      method: 'GET',
      baseURL: getCommonURL(),
      url: 'common/validate/token',
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getProductDetails = async () => {
  try {
    const response = await http({
      method: 'GET',
      baseURL: getCommonURL(),
      url: '/common/product/status',
    });

    return response;
  } catch (error) {
    return { error };
  }
};

export const getFreeTrial = async () => {
  try {
    const response = await http.get('common/merchant/getVRSFreeTrialInfo');

    return freeTrialAdapter.from(response.data);
  } catch (error) {
    return {
      error,
    };
  }
};

export const enableFreeTrial = async () => {
  try {
    const response = await http.post(
      'common/merchant/enableVRSFreeTrialInfo',
      {},
    );
    return response.data;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getFreeCreditRates = async () => {
  try {
    const response = await http.get('common/merchant/verification/preferences');

    return response.reduce(
      (productRate, { serviceName, rate }) => ({
        ...productRate,
        [serviceName]: rate,
      }),
      {},
    );
  } catch (error) {
    return { error };
  }
};

export const getFavouriteProducts = async () => {
  try {
    const response = await http.get('/verification/favourite-products');

    return response?.products?.filter(
      product =>
        ![
          'UPI_ADVANCE',
          'UPI_MOBILE_V',
          'UPIDETAILS_VALIDATION',
          'ESIGN_VRS',
          'AADHAAR_OCR_V',
          'PAN_OCR_V',
          'PAN_OCR',
          'MOBILE_ADVANCE',
          'OFFLINE_AADHAAR_VERIFICATION', // Filter out Aadhaar OKYC at API level
        ].includes(product),
    );
  } catch (error) {
    return { error };
  }
};

export const updateFavouriteProducts = async payload => {
  try {
    const response = await http.post(
      '/verification/favourite-products',
      payload,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getRechargeHistory = async (id, queryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http({
      method: 'GET',
      baseURL: getPayoutURL(),
      url: `payout/paymentInstruments/${id}/recharges?${queryStr}`,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getRechargeHistoryCount = async (id, queryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http({
      method: 'GET',
      baseURL: getPayoutURL(),
      url: `payout/paymentInstruments/${id}/recharges/count?${queryStr}`,
    });

    return response || { count: 0 };
  } catch (error) {
    return {
      error,
    };
  }
};
