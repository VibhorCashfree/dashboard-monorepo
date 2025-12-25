import _pick from 'lodash/pick';
import _keys from 'lodash/keys';

// Constants
import { DATE_RANGE } from 'constants/date';
import { LABEL_BY_STATUS } from 'constants/status';
import { UTR_LABEL } from 'constants/common';

// Utils
import Region from 'utils/region';

export enum STATUS {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REVERSED = 'REVERSED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  RECEIVED = 'RECEIVED',
  MANUALLY_REJECTED = 'MANUALLY_REJECTED',
}

const STATUSES = Object.keys(STATUS);

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export enum ACK_TYPE {
  Yes = 'YES',
  No = 'NO',
}

export const filtersConfig = {
  'Transfer Status': {
    items: STATUSES,
  },
  'Transfer Acknowledgment': {
    items: Object.keys(ACK_TYPE),
  },
};

export const options = [
  { text: 'Transfer ID', value: 'transferId' },
  { text: 'Bank Account', value: 'bankAccount' },
  { text: 'Beneficiary ID', value: 'beneficiaryId' },
  { text: UTR_LABEL[Region.get()], value: 'utr' },
  { text: 'Vpa', value: 'vpa' },
  { text: 'Reference ID', value: 'referenceId' },
];

export enum LABEL_BY_MODE {
  banktransfer = 'Bank Transfer',
  paytm = 'Paytm',
  upi = 'UPI',
  amazonpay = 'Amazon Pay',
  phone = 'Phone',
  imps = 'IMPS',
  neft = 'NEFT',
  rtgs = 'RTGS',
  ppc = 'Prepaid Card',
}

export const REQUIRED_FIELDS = [
  'transferMode',
  'beneId',
  'amount',
  'paymentInstrumentId',
];

export const extraChipConfig = [
  {
    prefix: 'Transfer Ackd.',
    values: _keys(ACK_TYPE),
  },
];

export const LIMIT_OPTIONS = [
  { key: '0', value: '10', text: '10' },
  { key: '1', value: '25', text: '25' },
  { key: '2', value: '50', text: '50' },
  { key: '3', value: '100', text: '100' },
];

export enum MODAL_TYPE {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  QUICK_TRANSFER = 'QUICK_TRANSFER',
  ADD_BENEFICIARY = 'ADD_BENEFICIARY',

  EMPTY = '',
}

export const DATE_RANGE_OPTIONS = [
  DATE_RANGE.LAST_7_DAYS,
  DATE_RANGE.LAST_15_DAYS,
  DATE_RANGE.LAST_MONTH,
  DATE_RANGE.THIS_YEAR,
];
