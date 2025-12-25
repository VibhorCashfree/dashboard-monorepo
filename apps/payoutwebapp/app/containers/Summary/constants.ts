// Constants
import { DATE_RANGE } from 'constants/date';

export const POLLING_MAX_COUNT = 3;

export const GRAPH = {
  width: window.innerWidth - 660,
  height: 280,
};

export const options = [
  { key: 'amount', displayName: 'Amount' },
  { key: 'count', displayName: 'Count' },
];

export const DATE_RANGE_OPTIONS = [
  DATE_RANGE.LAST_7_DAYS,
  DATE_RANGE.LAST_30_DAYS,
];

export const DATE_RANGE_OPTIONS_WITH_TODAY = [
  DATE_RANGE.LAST_30_MINS,
  DATE_RANGE.TODAY,
  DATE_RANGE.LAST_7_DAYS,
  DATE_RANGE.LAST_15_DAYS,
  DATE_RANGE.LAST_MONTH,
];

export const MODE_BY_PREF = {
  banktransfer: ['IMPS', 'NEFT', 'RTGS'],

  upi: ['UPI'],

  // paytm: ['PYTM'],
  // paytmbank: ['PYTM'],

  amazonpay: ['AMZN'],

  card: ['CARD'],
  creditcard: ['CC_UPI', 'CC_IMPS', 'CC_NEFT'],

  imps: ['IMPS'],
  neft: ['NEFT'],
  rtgs: ['RTGS'],
};

export const LABEL_BY_MODE = {
  IMPS: 'IMPS',
  NEFT: 'NEFT',
  RTGS: 'RTGS',
  UPI: 'UPI',
  PYTM: 'Paytm',
  AMZN: 'Amazon Pay',
  CARD: 'Card',
  FT: 'FT',
  PHONE: 'Phone',
  CC_UPI: 'Credit Card UPI',
  CC_IMPS: 'Credit Card IMPS',
  CC_NEFT: 'Credit Card NEFT',
};

export const statuses = [
  'PENDING',
  'SUCCESS',
  'FAILED',
  'REVERSED',
  'REJECTED',
  'RECEIVED',
  'MANUALLY_REJECTED',
];

export enum UNIT {
  MINUTES = 'minutes',
  HOURS = 'hours',
  DAYS = 'days',
}

export const startFormatByUnit = {
  [UNIT.MINUTES]: 'h:mm a',
  [UNIT.HOURS]: 'h:00 a',
  [UNIT.DAYS]: 'D',
};

export const endFormatByUnit = {
  [UNIT.MINUTES]: 'h:mm a',
  [UNIT.HOURS]: 'h:00 a',
  [UNIT.DAYS]: 'D MMM',
};
