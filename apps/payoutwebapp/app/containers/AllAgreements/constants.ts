import moment from 'moment';
import _pick from 'lodash/pick';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

export enum STATUS {
  SUCCESS = 'SUCCESS',
  INITIATED = 'INITIATED',
  SIGNED = 'SIGNED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  REFUND = 'REFUND',
}

const STATUSES = Object.keys(STATUS);

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Status Filter': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export const options = [{ text: 'Agreement ID', value: 'agreementId' }];

export const REQUIRED_FIELDS = {
  STEP_ONE: ['purpose', 'total_amount', 'start_date', 'expiry_date'],
  STEP_TWO: [
    'type',
    'name',
    'email',
    'phone',
    'bank_account',
    'ifsc',
    'address',
    'pan',
    'allocated_percentage_of_amount',
  ],
  MARK_TERMINAL_STATUS: ['status'],
};

export enum ESCROW_PARTY_TYPE {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
}

export const escrowPartyOptions = [
  {
    value: ESCROW_PARTY_TYPE.BUYER,
    text: 'Buyer',
  },
  {
    value: ESCROW_PARTY_TYPE.SELLER,
    text: 'Seller',
  },
];

export const statusOptions = [
  {
    value: 'SUCCESS',
    text: 'SUCCESS',
  },
  {
    value: 'REFUND',
    text: 'REFUND',
  },
];

export enum MODAL_TYPE {
  CREATE = 'CREATE',
  MARK_TERMINAL_STATUS = 'MARK_TERMINAL_STATUS',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  UPDATE_SUCCESS = 'UPDATE_SUCCESS',
  UPDATE_FAILED = 'UPDATE_FAILED',
  EMPTY = '',
}

export enum ACTION_TYPE {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export const dateSelectConfig = {
  min: moment().startOf('day').toDate(),
};
