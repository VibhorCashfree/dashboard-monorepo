export const DEFAULT_LIMIT = 10;
export const DEFAULT_CURRENT_PAGE = 1;

export enum ENV {
  TEST = 'test',
  PROD = 'prod',
}

export const LABEL_BY_ENV = {
  [ENV.TEST]: 'Test',
  [ENV.PROD]: 'Production',
};

export const SIZE_LIMIT = 5242880; // 5 MB
export const FILE_SIZE_CHECK = 'Max file size: 5MB';

export const UPLOAD_CHECK_LIST = [
  'Max no. of records: 10000',
  FILE_SIZE_CHECK,
  'File type: .csv, .xls, .xlsx',
];

export const defaultTabMenuConfig = {
  secondary: true,
  pointing: true,
};

export enum ACCOUNT_TYPE {
  GLOBAL_PAYOUTS = 'FI_OPGSP_EXP',
}
