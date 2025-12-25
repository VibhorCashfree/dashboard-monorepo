import _pick from 'lodash/pick';

// Constants
import { DATE_RANGE } from 'constants/date';
import { LABEL_BY_STATUS } from 'constants/status';

export enum STATUS {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  VALIDATED = 'VALIDATED',
  REJECTED = 'REJECTED',
  APPROVAL_PENDING = 'APPROVAL_PENDING',
  MANUALLY_REJECTED = 'MANUALLY_REJECTED',
}

const STATUSES = Object.keys(STATUS);

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  Status: {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export const options = [{ text: 'UTR No.', value: 'utr' }];

export const DATE_RANGE_OPTIONS = [
  DATE_RANGE.LAST_7_DAYS,
  DATE_RANGE.LAST_15_DAYS,
  DATE_RANGE.LAST_MONTH,
  DATE_RANGE.LAST_1_YEAR,
];
