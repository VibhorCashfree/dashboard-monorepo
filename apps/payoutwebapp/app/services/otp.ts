// Utils
import http from 'utils/http';
import { getBaseURL } from '../utils/common';

export const sendOTP = async () => {
  try {
    type Response = {
      status: string;
      message: string;
    };

    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'common/2fa/send',
      method: 'GET',
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verify2FA = async (code: string) => {
  try {
    type Response = {
      message: string;
      title: string;
      status: string;
    };

    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'common/2fa/verify',
      method: 'POST',
      data: {
        code,
      },
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const validate2FA = async () => {
  try {
    type Response = {
      message: string;
      title: string;
      status: string;
      data: {
        phoneNumber: string;
      };
    };

    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'common/2fa/validate',
      method: 'GET',
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};
