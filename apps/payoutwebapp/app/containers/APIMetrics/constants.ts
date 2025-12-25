// Constants
import { DATE_RANGE } from 'constants/date';

export enum METRIC_TYPE {
  ERROR = 'ERROR',
  LATENCY = 'LATENCY',
  STATUS_CODE = 'STATUS_CODE',
}

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
};

export const DATE_RANGE_OPTIONS = [DATE_RANGE.TODAY, DATE_RANGE.LAST_7_DAYS];

export const PAYOUTS = {
  Authentication: {
    'POST /payout/v1/authorize': {
      text: 'Authorize',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/authorize',
    },
    'POST /payout/v1/verifyToken': {
      text: 'Verify Token',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/verify-1',
    },
  },
  Account: {
    'GET /payout/v1/getBalance': {
      text: 'Get Balance',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/get-balance',
    },
    'GET /payout/v1.2/getBalance': {
      text: 'Get Balance v1.2',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/get-balance-v1-2',
    },
    'POST /payout/v1/internalTransfer': {
      text: 'Internal Transfer',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/internal-transfer',
    },
    'POST /payout/v1/selfWithdrawal': {
      text: 'Self Withdrawal',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/self-withdrawal',
    },
  },
  Beneficiary: {
    'POST /payout/v1/addBeneficiary': {
      text: 'Add Beneficiary',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v2/beneficiary-v2/create-beneficiary-v2',
    },
    'GET /payout/v1/getBeneficiary': {
      text: 'Get Beneficiary',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v2/beneficiary-v2/get-beneficiary-v2',
    },
    'GET /payout/v1/getBeneId': {
      text: 'Get Beneficiary Id',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/get-beneficiary-id',
    },
    'POST /payout/v1/removeBeneficiary': {
      text: 'Remove Beneficiary',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v2/beneficiary-v2/remove-beneficiary-v2',
    },
    'GET /payout/v1/beneHistory': {
      text: 'Beneficiary History',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/get-beneficiary-history',
    },
  },
  Transfers: {
    'POST /payout/v1/requestTransfer': {
      text: 'Request Transfer',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/standard-transfer-sync-v12',
    },
    'GET /payout/v1/getTransferStatus': {
      text: 'Get Transfer Status',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v2/transfers-v2/get-transfer-status-v2',
    },
    'GET /payout/v1/getTransfers': { text: 'Get Transfers', url: '' },
    'POST /payout/v1/requestBatchTransfer': {
      text: 'Request Batch Transfer',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v2/transfers-v2/batch-transfer-v2',
    },
    'GET /payout/v1/getBatchTransferStatus': {
      text: 'Get Batch Transfer Status',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v2/transfers-v2/get-batch-transfer-status-v2',
    },
    'POST /payout/v1/requestAsyncTransfer': {
      text: 'Request Async Transfer',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v2/transfers-v2/standard-transfer-v2',
    },
    'GET /payout/v1/incidents': {
      text: 'Get Incidents',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/get-incidents',
    },
    'POST /payout/v1/ccPay': { text: 'CC Pay', url: '' },
    'POST /payout/v1/cardpay': { text: 'Card Pay', url: '' },
    'POST /payout/v1/directTransfer': {
      text: 'Direct Transfer',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/direct-transfer-v12',
    },
    'GET /payout/v1/getTransferReport': {
      text: 'Get Transfer Report',
      url: '',
    },
    'POST /payout/v1/opgsp/requestBatchTransfer': {
      text: 'Request Batch Transfer',
      url: '',
    },
    'GET /payout/v1/opgsp/getBatchTransferStatus': {
      text: 'Get Batch Transfer Status',
      url: '',
    },
    'GET /payout/v1.1/getCurrentTransfersStatus': {
      text: 'Get Current Transfers Status',
      url: '',
    },
    'GET /payout/v1.1/getTransferStatus': {
      text: 'Get Transfer Status',
      url: '',
    },
    'POST /payout/v1.2/requestTransfer': {
      text: 'Request Transfer v1.2',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/standard-transfer-sync-v12-v-1-2',
    },
    'POST /payout/v1.2/requestAsyncTransfer': {
      text: 'Request Async Transfer v1.2',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v2/transfers-v2/standard-transfer-v2-v1-2',
    },
    'GET /payout/v1.2/getTransferStatus': {
      text: 'Get Transfer Status v1.2',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v2/transfers-v2/get-transfer-status-v2-v1-2',
    },
    'POST /payout/v1.2/requestBatchTransfer': {
      text: 'Request Batch Transfer v1.2',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v2/transfers-v2/batch-transfer-v2-v1-2',
    },
    'GET /payout/v1.2/getBatchTransferStatus': {
      text: 'Get Batch Transfer Status v1.2',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v2/transfers-v2/get-batch-transfer-status-v2-v1-2',
    },
    'POST /payout/v1.2/directTransfer': {
      text: 'Direct Transfer v1.2',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/direct-transfer-v12',
    },
    'POST /payout/v1.2/ccPay': { text: 'CC Pay v1.2', url: '' },
  },
};

export const CASHGRAMS = {
  'Cashgram Transfers': {
    'POST /payout/v1/createCashgram': {
      text: 'Create Cashgram',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/create-cashgram',
    },
    'GET /payout/v1/getCashgramStatus': {
      text: 'Get Cashgram Status',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/get-cashgram-status',
    },
    'POST /payout/v1/deactivateCashgram': {
      text: 'Deactivate Cashgram',
      url: 'https://www.cashfree.com/docs/api-reference/payouts/v1/deactivate-cashgram',
    },
  },
};

export const KNOW_MORE_BY_API = {
  ...PAYOUTS.Authentication,
  ...PAYOUTS.Account,
  ...PAYOUTS.Beneficiary,
  ...PAYOUTS.Transfers,

  ...CASHGRAMS['Cashgram Transfers'],
};

export const options = Object.keys(KNOW_MORE_BY_API).map((key) => ({
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
