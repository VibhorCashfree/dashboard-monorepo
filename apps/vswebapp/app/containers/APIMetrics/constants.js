// Constants
import { DEFAULT_VALUE, TODAY } from 'constants/date';

export const METRIC_TYPE = {
  ERROR: 'ERROR',
  LATENCY: 'LATENCY',
  STATUS_CODE: 'STATUS_CODE',
  SUCCESS_CODE: 'SUCCESS',
};

export const METRIC_INFO_BY_TYPE = {
  [METRIC_TYPE.ERROR]: {
    type: METRIC_TYPE.ERROR,
    text: 'Error Count',
    info: 'Count of different errors received during API calls',
  },
  [METRIC_TYPE.LATENCY]: {
    type: METRIC_TYPE.LATENCY,
    text: 'Latency',
    info: 'Time taken to respond API calls',
  },
  [METRIC_TYPE.STATUS_CODE]: {
    type: METRIC_TYPE.STATUS_CODE,
    text: 'Error Percentage',
    info: 'Percentage of API calls which received error out of total API calls',
  },
  [METRIC_TYPE.SUCCESS_CODE]: {
    type: METRIC_TYPE.SUCCESS_CODE,
    text: 'Success Percentage',
    info:
      'Percentage of API calls which received success out of total API calls',
  },
};

export const DATE_OPTIONS = [TODAY, DEFAULT_VALUE];

export const VRS = {
  'Bank Account Verification': {
    'GET /payout/v1.2/validation/bankDetails': {
      text: 'Bank Verification Sync V1.2',
      url: 'https://docs.cashfree.com/reference/bankverificationsyncv12',
    },
    'GET /payout/v1/asyncValidation/bankDetails': {
      text: 'Bank Verification Async',
      url: 'https://docs.cashfree.com/reference/bankverificationasync',
    },
    'GET /payout/v1/getValidationStatus/bank': {
      text: 'Get Verification Status',
      url: 'https://docs.cashfree.com/reference/getverificationstatus-1',
    },
  },
  UPI: {
    'GET /payout/v1/validation/upiDetails': {
      text: 'UPI Verification',
      url: 'https://docs.cashfree.com/reference/upi-verification',
    },
  },
  IFSC: {
    'GET /payout/v1/ifsc/:ifsc': {
      text: 'IFSC Verification',
      url: 'https://docs.cashfree.com/reference/ifsc-verification',
    },
  },
  'Bulk Verification': {
    'POST /payout/v1/bulkValidation/bankDetails': {
      text: 'Bulk Bank Verification',
      url: 'https://docs.cashfree.com/reference/bulk-bank-verification',
    },
    'GET /payout/v1/getBulkValidationStatus': {
      text: 'Get Bulk Verification Status',
      url: 'https://docs.cashfree.com/reference/get-bulk-verification-status',
    },
  },
  'PAN Verification': {
    'POST pan-verify': {
      text: 'Verify PAN',
      url: '',
    },
  },
  'AADHAAR Verification': {
    'POST okyc-send-otp': {
      text: 'OKYC Send OTP',
      url: '',
    },
    'POST okyc-verify': {
      text: 'OKYC Verify',
      url: '',
    },
  },
  'OCR Verification': {
    'POST pan-ocr': {
      text: 'PAN OCR',
      url: '',
    },
    'POST aadhaar-ocr': {
      text: 'Aadhaar OCR',
      url: '',
    },
  },
  'GSTIN Verification': {
    'POST gstin-verification': {
      text: 'GSTIN Verification',
      url: '',
    },
  },
};

export const KNOW_MORE_BY_API = {
  ...VRS['Bank Account Verification'],
  ...VRS.UPI,
  ...VRS.IFSC,
  ...VRS['Bulk Verification'],
};

export const options = Object.keys(KNOW_MORE_BY_API).map(key => ({
  value: key,
  text: key,
}));

export const GRAPH = {
  width: window.innerWidth - 300,
  height: 540,
  colors: [
    '#265AE0',
    '#FF0000',
    '#00FF00',
    '#FFC0CB',
    '#FF8A33',
    '#E633FF',
    '#979191',
    '#444444',
    '#2371EA',
    '#9F23EA',
  ],
};
