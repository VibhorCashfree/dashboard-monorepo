import _pick from 'lodash/pick';

// Constants
import { REGION } from 'constants/common';
import { LABEL_BY_STATUS } from 'constants/status';

export enum STATUS {
  PROCESSING = 'PROCESSING',
  REJECTED = 'REJECTED',
  PROCESSED = 'PROCESSED',
  CANCELLED = 'CANCELLED',
}

const STATUSES = Object.keys(STATUS);

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const BulkIbanFileType = 'BULK_IBAN_UAE';

export const filtersConfig = {
  Status: {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export enum MODAL_TYPE {
  UPLOAD = 'UPLOAD',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  EMPTY = '',
}

export const BULK_BENE_LABEL: StringObject = {
  [REGION.IN]: 'Others',
  [REGION.AE]: 'Batch Beneficiary',
};

export const options = [
  { text: 'File ID', value: 'fileId' },
  { text: 'File Name', value: 'fileName' },
];
