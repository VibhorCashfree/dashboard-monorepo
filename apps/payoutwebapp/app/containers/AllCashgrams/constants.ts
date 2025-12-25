import moment from 'moment';
import _pick from 'lodash/pick';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

export enum STATUS {
  ACTIVE = 'ACTIVE',
  OPENED = 'OPENED',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  REDEEMED = 'REDEEMED',
  TRANSFER_REVERSAL = 'TRANSFER_REVERSAL',
  VERIFICATION_PENDING = 'VERIFICATION_PENDING',
}

const STATUSES = Object.keys(STATUS);

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Status Filter': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export const options = [
  { text: 'Cashgram ID', value: 'cashgramId' },
  { text: 'Phone Number', value: 'phone' },
];

export const dateSelectConfig = {
  min: moment().startOf('day').toDate(),
  max: moment().startOf('day').add(30, 'days').toDate(),
};

export const REQUIRED_FIELDS = ['cashgramId', 'name', 'phone', 'amount'];

export const payoutTypeOptions = [
  {
    text: 'Refunds',
    value: 'Refunds',
  },
  {
    text: 'Reimbursement',
    value: 'Reimbursement',
  },
  {
    text: 'Rewards',
    value: 'Rewards',
  },
];

export enum ACTION_TYPE {
  SEND = 'SEND',
  COPY = 'COPY',
  DEACTIVATE = 'DEACTIVATE',
}

export enum MODAL_TYPE {
  SEND = 'SEND',
  DEACTIVATE = 'DEACTIVATE',
  CREATE = 'CREATE',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  DEACTIVATE_SUCCESS = 'DEACTIVATE_SUCCESS',
  DEACTIVATE_FAILED = 'DEACTIVATE_FAILED',
  EMPTY = '',
}
