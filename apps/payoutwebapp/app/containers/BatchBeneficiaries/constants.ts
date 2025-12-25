import _pick from 'lodash/pick';

// Constants
import { REGION, BENE_PURPOSE, BULK_BENE_FILE_TYPE } from 'constants/common';
import { LABEL_BY_STATUS } from 'constants/status';

// Utils
import Region from 'utils/region';

const region = Region.get();

export enum STATUS {
  PROCESSING = 'PROCESSING',
  REJECTED = 'REJECTED',
  PROCESSED = 'PROCESSED',
  CANCELLED = 'CANCELLED',
}

const STATUSES = Object.keys(STATUS);

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Beneficiary Purpose': {
    columns: 2,
    items: Object.keys(BENE_PURPOSE),
  },
  'Verification Status': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export enum MODAL_TYPE {
  UPLOAD = 'UPLOAD',
  SUCCESS = 'SUCCESS',
  CANCEL = 'CANCEL',
  FAILED = 'FAILED',
  FAILED_WITH_NO_VALID = 'FAILED_WITH_NO_VALID',
  FAILED_WITH_VALID = 'FAILED_WITH_VALID',
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

export const benePurposeWithDescriptionOptions = [
  {
    value: BENE_PURPOSE.CORP_CC,
    label: 'Corporate Credit Card',
    description:
      'Send money to this beneficiary using your corporate credit card.',
  },
  {
    value: BENE_PURPOSE.AMAZON_UPI_BENE,
    label: 'Amazon Pay Wallet',
    description:
      'Send money to this beneficiary via Amazon Pay Wallet-UPI details.',
  },
  {
    value: BULK_BENE_FILE_TYPE[region],
    label: BULK_BENE_LABEL[region],
    description: 'Send money to this beneficiary through other fund sources.',
  },
];

export const fileTypeOptions = [
  {
    value: BENE_PURPOSE.CORP_CC,
    text: 'Corporate Credit Card',
  },
  {
    value: BENE_PURPOSE.AMAZON_UPI_BENE,
    text: 'Amazon Pay Wallet',
  },
  {
    value: BULK_BENE_FILE_TYPE[region],
    text: BULK_BENE_LABEL[region],
  },
];
