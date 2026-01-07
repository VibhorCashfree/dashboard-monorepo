import { toast } from '@cashfree-intl/coherent';
import {
  getQueryString,
  triggerDownload,
  copyToClipboard as copyToClipboardShared,
  downloadText,
  getSizeText,
  formatNumber,
  decodeFile,
  arrayToObject,
  joinWithAnd,
  getFileName,
  showDownload as showDownloadShared,
} from '@dashboard-monorepo/shared';

// Constants
import { CURRENCY, REGION, LOCALES, CURRENCY_SYMBOL } from 'constants/common';

// Utils
import Region from 'utils/region';
import Env from './env';
import getQuery from './getQuery';
import Emitter from './emitter';
import Regex from './regex';

export {
  getQueryString,
  triggerDownload,
  downloadText,
  getSizeText,
  formatNumber,
  decodeFile,
  arrayToObject,
  joinWithAnd,
  getFileName,
};

export const base64Download = (
  base64String: string,
  name: string,
  blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
) => {
  // Convert the Base64 string to binary data
  const binaryData = decodeURIComponent(escape(atob(base64String)));

  // Create a Uint8Array from the binary data
  const uint8Array = new Uint8Array(
    [...binaryData].map((char) => char.charCodeAt(0)),
  );

  // Create a Blob from the Uint8Array
  const blob = new Blob([uint8Array], {
    type: blobType,
  });

  // Create a URL for the Blob
  const blobUrl = URL.createObjectURL(blob);

  // Create a download link
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = name;

  // Trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up the URL object
  URL.revokeObjectURL(blobUrl);
};

export const copyToClipboard = (text: any) => {
  copyToClipboardShared(text);
  toast.success('Copied to clipboard!');
};

export const formatAmount = (amount: any, currencyCode?: CURRENCY) => {
  const region = Region.get();

  const codeByRegion: StringObject = {
    [REGION.IN]: CURRENCY.INR,
    [REGION.AE]: CURRENCY.AED,
  };

  const currency = currencyCode || codeByRegion[region];

  const locales = LOCALES[region];

  const currencyFormat = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });

  return currencyFormat
    .format(amount)
    .replace('NaN', '0.00')
    .replace(CURRENCY_SYMBOL[currency], CURRENCY_SYMBOL[currency] + ' ');
};

export const getBaseURL = (isCommonAPI?: boolean) => {
  if (Region.get() === REGION.AE) {
    if (isCommonAPI) {
      return process.env.MERCHANT_API_UAE_URL;
    }

    return process.env.PAYOUTS_API_UAE_URL;
  }

  if (Env.isTest()) {
    if (isCommonAPI) {
      return process.env.TEST_MERCHANT_API_URL;
    }

    return process.env.TEST_PAYOUTS_API_URL;
  } else if (isCommonAPI) {
    return process.env.MERCHANT_API_URL;
  }

  return process.env.PAYOUTS_API_URL;
};

export const emitUserValidation = (callback: (...args: any[]) => void) => {
  if (process.env.NODE_ENV === 'test' || Env.isTest()) {
    callback();
    return;
  }

  Emitter.emit('VALIDATE_USER', callback);
};

export const extractFiltersFromQuery = () => {
  const query = getQuery();
  const statuses = query.get('status');
  const startDate = query.get('startDate');
  const endDate = query.get('endDate');

  const queryObj: AnyObject = {};

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

export const arrayToCsv = (arr: any[]) => {
  const headings = Object.keys(arr[0]).join(',');

  const body = arr.map((item) => Object.values(item).join()).join('\n');

  return `${headings}\n${body}`;
};

export const digitOnlyKeys = (e: KeyboardEvent) => {
  const isNumber = /^[0-9]$/i.test(e.key);
  const NAVIGATION_KEYS = [
    'Backspace',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
  ];

  if (!(isNumber || NAVIGATION_KEYS.includes(e.key))) {
    e.preventDefault();
  }
};

export const getCardCompany = (value: string) => {
  if (!value || value.length < 12 || !Regex.digits(value)) {
    return '';
  }

  // American Express
  if (/^3[47]/.test(value)) {
    return 'amex';
  }

  // Discover Card
  if (
    /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/.test(
      value,
    )
  ) {
    return 'discover';
  }

  // MasterCard
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      value,
    )
  ) {
    return 'master';
  }

  // Maestro
  if (/^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/.test(value)) {
    return 'maestro';
  }

  // Diners, Diners - Carte Blanche
  if (/^(36|38)/.test(value) || /^30[0-5]/.test(value)) {
    return 'diners';
  }

  // JCB
  if (/^35(2[89]|[3-8][0-9])/.test(value)) {
    return 'jcb';
  }

  // RuPay
  if (/^6(?!011)(?:0[0-9]{14}|52[12][0-9]{12})$/.test(value)) {
    return 'rupay';
  }

  // Visa, Visa Electron
  if (/^4/.test(value) || /^(4026|417500|4508|4844|491(3|7))/.test(value)) {
    return 'visa';
  }

  return '';
};

export const showDownload = showDownloadShared;

export const toggleItem = (list: any[], item: any) => {
  if (list.includes(item)) {
    return list.filter((listItem) => listItem !== item);
  }

  return [...list, item];
};

export const getCurrencySymbol = (currency?: string) => {
  const region = Region.get();

  const codeByRegion: StringObject = {
    [REGION.IN]: CURRENCY.INR,
    [REGION.AE]: CURRENCY.AED,
  };

  const currencyCode = currency || codeByRegion[region];

  return CURRENCY_SYMBOL[currencyCode];
};
