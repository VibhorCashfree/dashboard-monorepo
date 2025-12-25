import _pick from 'lodash/pick';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

export enum STATUS {
  PROCESSING = 'PROCESSING',
  PARTIALLY_APPROVED = 'PARTIALLY_APPROVED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  MANUALLY_REJECTED = 'MANUALLY_REJECTED',
  REJECTED = 'REJECTED',
  PROCESSED = 'PROCESSED',
  CANCELLED = 'CANCELLED',
}

const STATUSES = Object.keys(STATUS);

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export enum MODAL_TYPE {
  UPLOAD = 'UPLOAD',
  SUCCESS = 'SUCCESS',
  CANCEL = 'CANCEL',
  FAILED = 'FAILED',
  FAILED_WITH_NO_VALID = 'FAILED_WITH_NO_VALID',
  FAILED_WITH_VALID = 'FAILED_WITH_VALID',
  EMPTY = '',
}

export const options = [
  { text: 'File ID', value: 'fileId' },
  { text: 'File Name', value: 'fileName' },
];

export const filtersConfig = {
  'Status Filter': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};
