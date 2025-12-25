import _pick from 'lodash/pick';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

export enum STATUS {
  INVALID = 'INVALID',
}

const STATUSES = Object.keys(STATUS);

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Status Filter': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export enum MODAL_TYPE {
  ADD = 'ADD',
  DELETE = 'DELETE',
  SUCCESS = 'SUCCESS',
  UPDATE = 'UPDATE',
  EMPTY = '',
}

export const REQUIRED_FIELDS = {
  STEP_ONE: ['beneId', 'benePurpose', 'name', 'phone', 'email', 'address1'],
  STEP_TWO: [],
  STEP_THREE: ['panCard', 'gstIn', 'cin', 'din'],
};

export const DEFAULT_IBAN_FEEDBACK = {
  COUNTRY_CODE: {
    message: 'Country Code',
    type: 'info',
  },
  LENGTH: {
    message: 'IBAN Length: Enter first 2 digits of IBAN to know exact length',
    type: 'info',
  },
  REGEX_FORMAT: {
    message: 'IBAN Format: Enter first 2 digits of IBAN to know exact format',
    type: 'info',
  },
};
