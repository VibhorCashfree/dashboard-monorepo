import { Amount } from '@cashfree-intl/coherent';
import {
  getQueryString,
  triggerDownload,
  copyToClipboard,
  getSizeText,
  downloadText,
  formatNumber,
  decodeFile,
  arrayToObject,
  joinWithAnd,
  showDownload,
  getFileName as getFileNameShared,
} from '@dashboard-monorepo/shared';

// Utils
import Env from './env';
import getQuery from './getQuery';
import Emitter from './emitter';
import { captureException } from '@sentry/react';

export {
  getQueryString,
  triggerDownload,
  copyToClipboard,
  getSizeText,
  downloadText,
  formatNumber,
  decodeFile,
  arrayToObject,
  joinWithAnd,
  showDownload,
};

export const getFileName = (fileName, id, status) => getFileNameShared(fileName, id, status);

const rupeeFormat = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
});

export const formatAmount = amount =>
  rupeeFormat
    .format(amount)
    .replace('NaN', '0.00')
    .replace('₹', '₹ ');

export const getBaseURL = () => {
  if (Env.isTest()) {
    return process.env.TEST_API_URL;
  }

  return process.env.API_URL;
};

export const getFAQBaseURL = () => {
  if (Env.isTest()) {
    return process.env.FAQ_TEST_API_URL;
  }

  return process.env.FAQ_API_URL;
};

export const getCommonURL = () => {
  if (Env.isTest()) {
    return process.env.TEST_COMMON_API_URL;
  }

  return process.env.COMMON_API_URL;
};

export const getPayoutURL = () => {
  if (Env.isTest()) {
    return process.env.TEST_PAYOUTS_API_URL;
  }

  return process.env.PAYOUTS_API_URL;
};

export const getPGGrowthURL = () => {
  if (Env.isTest()) {
    return process.env.TEST_PG_GROWTH_SVC_URL;
  }

  return process.env.PG_GROWTH_SVC_URL;
};

export const emitUserValidation = callback => {
  if (Env.isTest()) {
    callback();
    return;
  }

  Emitter.emit('VALIDATE_USER', callback);
};

export const formatFiltersFromQuery = () => {
  const query = getQuery();
  const statuses = query.get('status');
  const startDate = query.get('startDate');
  const endDate = query.get('endDate');

  const queryObj = {};

  if (statuses) {
    queryObj.statuses = statuses
      .split(',')
      .reduce((acc, status) => ({ ...acc, [status]: true }), {});
  }

  if (startDate && endDate) {
    queryObj.range = [Number(startDate), Number(endDate)];
  }

  return queryObj;
};

export const loginFormSubmit = (
  redirectToTest,
  dashboardType,
  options = {},
) => {
  const form = document.createElement('form');
  const token = localStorage.getItem('merchantToken');

  let formFields = [];

  if (redirectToTest) {
    formFields = formFields.concat({ name: 'goToTest', value: 1 });
  }

  const { target, iframe } = options;

  if (iframe) {
    formFields = formFields.concat({ name: 'iframe', value: iframe });
  }

  formFields = formFields.concat([
    { name: 'token', value: token },
    { name: 'merchantToken', value: token },
  ]);

  if (dashboardType) {
    formFields.push({ name: 'dashboardType', value: dashboardType });
  }

  form.setAttribute('method', 'post');
  form.setAttribute('action', `${process.env.LEGACY_APP}/jwt-auth-v2`);

  if (target) {
    form.setAttribute('target', target);
  }

  formFields.forEach(field => {
    const input = document.createElement('input');

    input.setAttribute('type', 'hidden');
    input.setAttribute('name', field.name);
    input.setAttribute('value', field.value);

    form.appendChild(input);
  });

  document.body.appendChild(form);

  form.submit();
};

export const digitOnlyKeys = e => {
  const isNumber = /^[0-9]$/i.test(e.key);
  const NAVIGATION_KEYS = ['Backspace', 'ArrowUp', 'Delete'];

  if (!(isNumber || NAVIGATION_KEYS.includes(e.key))) {
    e.preventDefault();
  }
};

export const formatDate = date => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
};

export const formatAmountINR = value => {
  const val = Math.abs(value);
  if (val >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `${(value / 100000).toFixed(2)} Lac`;
  return formatNumber(value);
};

/**
 * The function `setupAPIErrors` captures exceptions with specific tags related to API errors.
 * @param url - The `url` parameter in the `setupAPIErrors` function is the endpoint URL of the API
 * where the error occurred.
 * @param message - The `message` parameter in the `setupAPIErrors` function is a string that
 * represents the error message or description related to the API error that occurred. It is used to
 * provide more context about the error when capturing the exception.
 */
export const setupAPIErrors = (url, message) => {
  try {
    captureException(message, {
      tags: {
        errorType: 'api',
        apiEndpoint: url,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
