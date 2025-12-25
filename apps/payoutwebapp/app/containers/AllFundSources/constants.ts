import _pick from 'lodash/pick';

// Constants
import { DATE_RANGE } from 'constants/date';
import { LABEL_BY_STATUS } from 'constants/status';
import { FILE_SIZE_CHECK } from 'constants/common';

export enum ACTION_TYPE {
  UPDATE_DETAILS = 'UPDATE_DETAILS',

  ADD_BALANCE = 'ADD_BALANCE',
  DEACTIVATE = 'DEACTIVATE',

  CONNECT = 'CONNECT',
  APPROVE = 'APPROVE',
}

export enum MODAL_TYPE {
  UPDATE_WEIGHTAGE = 'UPDATE_WEIGHTAGE',
  UPDATE_DETAILS = 'UPDATE_DETAILS',

  SUCCESS = 'SUCCESS',
  AGGREGATOR_SUCCESS = 'AGGREGATOR_SUCCESS',

  DEACTIVATE = 'DEACTIVATE',
  ADD_BALANCE = 'ADD_BALANCE',

  CREATE_AGGREGATOR = 'CREATE_AGGREGATOR',
  CREATE_BANK_ACCOUNT = 'CREATE_BANK_ACCOUNT',
  CREATE_ROUTER_BANK_ACCOUNT = 'CREATE_ROUTER_BANK_ACCOUNT',

  APPROVE_ICIC = 'APPROVE_ICIC',
  APPROVE_YESB = 'APPROVE_YESB',
  INVALID_ACCOUNT_YESB = 'INVALID_ACCOUNT_YESB',

  EMPTY = '',
}

export const errorByMessage = {
  INVALID_ACCOUNT_FAIL: {
    key: 'bankAccount',
    text: 'Incorrect account number.',
  },
  BANK_ACCOUNT_EXISTS: {
    key: 'bankAccount',
    text: 'Bank account already exists.',
  },
  INVALID_IFSC_FAIL: {
    key: 'ifsc',
    text: 'Incorrect IFSC.',
  },
  INVALID_ACCT_HOLDER_NAME: {
    key: 'accountHolderName',
    text: 'Incorrect account holder name.',
  },
  INVALID_CUSTOMER_ID: {
    key: 'customerId',
    text: 'Incorrect customer ID.',
  },
  FUND_SOURCE_NAME_EXISTS: {
    key: 'displayName',
    text: 'Name already exists.',
  },
};

export const REQUIRED_FIELDS = {
  ADD_BALANCE: ['amount'],
  UPDATE_DETAILS: ['displayName'],
  // CONNECTED_WALLET: ['displayName', 'bankAccount'],
};

export const ACTIONS_BY_STATUS = {
  DEACTIVATED: [ACTION_TYPE.UPDATE_DETAILS],
  VERIFICATION_PENDING: [ACTION_TYPE.DEACTIVATE],
  VERIFICATION_FAILED: [ACTION_TYPE.DEACTIVATE],
  ACTIVE: [
    ACTION_TYPE.ADD_BALANCE,
    ACTION_TYPE.UPDATE_DETAILS,
    ACTION_TYPE.DEACTIVATE,
  ],
  AUTHORIZATION_PENDING: [
    ACTION_TYPE.APPROVE,
    ACTION_TYPE.UPDATE_DETAILS,
    ACTION_TYPE.DEACTIVATE,
  ],
  AWAITING_CONNECTION: [
    ACTION_TYPE.CONNECT,
    ACTION_TYPE.UPDATE_DETAILS,
    ACTION_TYPE.DEACTIVATE,
  ],
  UAT_CREDS_VERIFIED: [
    ACTION_TYPE.CONNECT,
    ACTION_TYPE.UPDATE_DETAILS,
    ACTION_TYPE.DEACTIVATE,
  ],
  PROD_CREDS_VERIFIED: [
    ACTION_TYPE.CONNECT,
    ACTION_TYPE.UPDATE_DETAILS,
    ACTION_TYPE.DEACTIVATE,
  ],
  LEAD_APPROVED: [
    ACTION_TYPE.CONNECT,
    ACTION_TYPE.UPDATE_DETAILS,
    ACTION_TYPE.DEACTIVATE,
  ],
  SKIP_UAT: [
    ACTION_TYPE.CONNECT,
    ACTION_TYPE.UPDATE_DETAILS,
    ACTION_TYPE.DEACTIVATE,
  ],
};

export const UPLOAD_CHECK_LIST = [FILE_SIZE_CHECK, 'File type: .pdf'];

export enum YES_BUSINESS_TYPE {
  PRIVATE = 'Private Limited',
  PARTNERSHIP = 'Partnership',
  PROPRIETORSHIP = 'Proprietorship',
}

export const YES_BUSINESS_URL_BY_TYPE = {
  [YES_BUSINESS_TYPE.PRIVATE]:
    'https://new-cfmerchantdocsdevo.s3.ap-south-1.amazonaws.com/payoutsmerchantdashboard/connected/yesbank/existing_account/Limited_company.zip',
  [YES_BUSINESS_TYPE.PARTNERSHIP]:
    'https://new-cfmerchantdocsdevo.s3.ap-south-1.amazonaws.com/payoutsmerchantdashboard/connected/yesbank/existing_account/Partnership_firm.zip',
  [YES_BUSINESS_TYPE.PROPRIETORSHIP]:
    'https://new-cfmerchantdocsdevo.s3.ap-south-1.amazonaws.com/payoutsmerchantdashboard/connected/yesbank/existing_account/Proprietorship_firm.zip',
};

export enum INVOICING_TYPE {
  WALLET = 'DEBIT_CHARGES_FROM_WALLET',
  BANK_ACCOUNT = 'DEBIT_CHARGES_FROM_BANK_ACCOUNT',
}

export const DATE_RANGE_OPTIONS = [
  DATE_RANGE.LAST_7_DAYS,
  DATE_RANGE.LAST_15_DAYS,
  DATE_RANGE.LAST_MONTH,
];

export enum STATUS {
  VERIFICATION_PENDING = 'VERIFICATION_PENDING',
  VERIFICATION_FAILED = 'VERIFICATION_FAILED',
  AWAITING_CONNECTION = 'AWAITING_CONNECTION',
  AUTHORIZATION_PENDING = 'AUTHORIZATION_PENDING',
  UAT_CREDS_VERIFIED = 'UAT_CREDS_VERIFIED',
  PROD_CREDS_VERIFIED = 'PROD_CREDS_VERIFIED',
  ACTIVE = 'ACTIVE',
  SKIP_UAT = 'SKIP_UAT',
  DEACTIVATED = 'DEACTIVATED',
  LEAD_REJECTED = 'LEAD_REJECTED',
  LEAD_APPROVED = 'LEAD_APPROVED',
}

const STATUSES = Object.keys(STATUS);

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Status Filter': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};
