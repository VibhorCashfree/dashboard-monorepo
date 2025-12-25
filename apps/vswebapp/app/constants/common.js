export const DEFAULT_LIMIT = 10;
export const DEFAULT_CURRENT_PAGE = 1;

export const TEST = 'test';
export const PROD = 'prod';

export const ENV_CONFIG = {
  [TEST]: { key: TEST, displayText: 'Test' },
  [PROD]: { key: PROD, displayText: 'Prod' },
};

export const UPLOAD_CHECK_LIST = [
  'Max no. of records: 10000',
  'Max file size: 5MB',
  'File type: .csv, .xlsx',
];

export const ACCOUNT_TYPES = {
  GLOBAL_PAYOUTS: 'FI_OPGSP_EXP',
};

export const GENDER = {
  M: 'Male',
  F: 'Female',
};

export const menuConfig = { secondary: true, pointing: true };
