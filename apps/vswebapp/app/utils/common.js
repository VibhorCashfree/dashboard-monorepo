import _keyBy from 'lodash/keyBy';
import _mapValues from 'lodash/mapValues';
import { Amount } from '@cashfree-intl/coherent';

// Utils
import Env from './env';
import getQuery from './getQuery';
import Emitter from './emitter';
import { captureException } from '@sentry/react';

export const getQueryString = obj =>
  Object.keys(obj).reduce((acc, key) => {
    let str = acc;
    const value = obj[key];

    if (Array.isArray(value)) {
      if (value.length) {
        str += `${value.map(v => getEncodeURI(key, v)).join('')}`;
      }
    } else if (value) {
      str += getEncodeURI(key, value);
    }

    return str;
  }, '');

const getEncodeURI = (key, value) => `${key}=${encodeURIComponent(value)}&`;

export const triggerDownload = (dataObj, name = '') => {
  if (!window.URL.createObjectURL) {
    return;
  }

  const link = document.createElement('a');
  const zipFile = window.URL.createObjectURL(
    new Blob([dataObj.payload], { type: 'octet/stream' }),
  );

  link.href = dataObj.type === 'URL' ? dataObj.payload : zipFile;

  link.setAttribute('download', name);
  link.setAttribute('target', '_blank');

  document.body.appendChild(link);

  link.click();
  link.remove();
};

export const copyToClipboard = value => {
  navigator.clipboard.writeText(value);
};

export const getSizeText = size => {
  if (size) {
    const k = 1024;
    const suffix = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(size) / Math.log(k));

    return `${parseFloat((size / k ** i).toFixed(1))} ${suffix[i]}`;
  }

  return '0 Byte';
};

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

export const downloadText = (filename, text) => {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`,
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

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

export const formatNumber = num => {
  if (num > 999 && num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`;
  }

  if (num > 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }

  if (num < 1000) {
    return num;
  }
};

export const decodeFile = (str = '') => {
  const buffer = Buffer.from(str, 'base64');
  return buffer.toString();
};

export const arrayToObject = (arr, idKey, valueKey) =>
  _mapValues(_keyBy(arr, idKey), valueKey);

export const joinWithAnd = inputArr => {
  const arr = [...inputArr];

  if (arr.length > 1) {
    const last = arr.pop();
    return `${arr.join(', ')} and ${last}`;
  }

  return arr.join(', ');
};

export const showDownload = status => status !== 'APPROVED';

export const getFileName = (fileName, id, status) => {
  const idx = fileName.lastIndexOf('.');
  const prefix = fileName.slice(0, idx);
  const suffix = id;
  const extension = fileName.slice(idx);

  if (status === 'PROCESSING') {
    return `${prefix}(${suffix})_pending${extension}`;
  }

  // Eg. <file_name>(<file_id>).<extension> : test(123).csv
  return `${prefix}(${suffix})${extension}`;
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
