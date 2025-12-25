import axios from 'axios';
import _get from 'lodash/get';
import { toast } from '@cashfree-intl/coherent';

// Utils
import Emitter from './emitter';
import { getBaseURL, setupAPIErrors } from 'utils/common';
import Token from './token';

const NO_TOAST = {
  TITLES: [
    'JWT_TOKEN_INVALID',
    'VERIFY_OTP',
    'VERIFY_G2FA',
    'VERIFY_2FA_MAX_LIMIT_REACHED',
    'SEND_OTP_MAX_LIMIT_REACHED',
    'USER_NOT_AUTHORIZED',
  ],
  MESSAGES: [
    'resource not found',
    'Payout Account not authorized',
    'No oauth applications found',
  ],
};

const instance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    Authorization: `Bearer ${Token.get()}`,
    'API-VERSION': '2021-02-02',
  },
});

instance.interceptors.request.use(
  function beforeRequest(config) {
    return config;
  },
  function afterRequest(error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function successResponse(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger

    return response.data;
  },
  function errorResponse(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const message = _get(error, 'response.data.message');
    const statusCode = _get(error, 'response.status');
    const title = _get(error, 'response.data.title');
    const detail = _get(error, 'response.data.detail');

    const isCountAPI = error.request.responseURL.includes('/count');
    const isDraftAPI = error.request.responseURL.includes('/drafts'); // TODO: BE needs to correct error format

    if (
      isDraftAPI &&
      detail !== 'Workflow Ui data is null or same, Please send updated data.'
    ) {
      toast.error(detail);
    }

    if (process.env.NODE_ENV !== 'development' && statusCode === 401) {
      localStorage.clear();
      document.cookie =
        'token=;expires=Thu 01 Jan 1970;domain=cashfree.com;path=/;';
      window.location.href = process.env.LEGACY_APP;
    }

    // if (statusCode === 401) {
    //   Emitter.emit('TOKEN_EXPIRED');
    //   return;
    // }

    if (statusCode >= 500) {
      toast.error('Something went wrong. Try again after some time.');
    } else if (
      !(
        NO_TOAST.MESSAGES.includes(message) ||
        NO_TOAST.TITLES.includes(title) ||
        isCountAPI
      )
    ) {
      toast.error(message);
    }

    return Promise.reject(error?.response?.data);
  },
);

export default instance;
