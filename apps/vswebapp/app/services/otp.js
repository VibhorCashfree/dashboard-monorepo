// Utils
import http from 'utils/http';
import Env from 'utils/env';

export const sendOTP = async () => {
  try {
    const response = await http({
      method: 'GET',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: 'common/2fa/send',
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verify2FA = async code => {
  try {
    const response = await http({
      method: 'POST',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: 'common/2fa/verify',
      data: { code },
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const validate2FA = async () => {
  try {
    const response = await http({
      method: 'GET',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: 'common/2fa/validate',
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const get2FASettings = async () => {
  try {
    const response = await http({
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: 'common/2fa/settings',
      method: 'GET',
    });
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
