import axios from 'axios';
import _get from 'lodash/get';
import { toast } from '@cashfree-intl/coherent';

// Constants
import {
  NO_TOAST,
  MOCK_ERROR,
  INTERNAL_SERVER_ERROR,
  ERROR_BY_MESSAGE,
} from 'constants/errors';

// Utils
import { getBaseURL } from 'utils/common';
import Token from './token';

const http = axios.create({
  baseURL: getBaseURL(false),
  headers: {
    Authorization: `Bearer ${Token.get()}`,
    'API-VERSION': '2021-02-02',
  },
});

http.interceptors.request.use(
  function beforeRequest(config) {
    return config;
  },
  function afterRequest(error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
http.interceptors.response.use(
  function successResponse(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data;
  },
  function errorResponse(error) {
    /* eslint-disable no-console */
    console.log(error);

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const message = _get(error, 'response.data.message');
    const statusCode = _get(error, 'response.status');
    const title = _get(error, 'response.data.title');

    const { LEGACY_APP: legacyUrl = '/', NODE_ENV: env } = process.env;

    if (env === 'test') {
      throw MOCK_ERROR;
    }

    if (env !== 'development' && statusCode === 401) {
      (window as any).IS_UNAUTHORISED = true;
      localStorage.clear();

      document.cookie =
        'token=;expires=Thu 01 Jan 1970;domain=cashfree.com;path=/;';
      sessionStorage.setItem('referrerUrl', window.location.href);

      window.location.href = legacyUrl;
      return;
    }

    const apiCheck = NO_TOAST.APIS.some((api) =>
      error.request.responseURL.includes(api),
    );

    if (!apiCheck) {
      if (statusCode >= 500) {
        toast.error(INTERNAL_SERVER_ERROR);
      } else if (
        !(
          NO_TOAST.MESSAGES.includes(message) || NO_TOAST.TITLES.includes(title)
        )
      ) {
        toast.error(ERROR_BY_MESSAGE[message] || message);
      }
    }

    return Promise.reject(error.response.data);
  },
);

export default http;
