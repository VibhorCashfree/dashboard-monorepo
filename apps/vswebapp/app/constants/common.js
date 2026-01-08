import {
  DEFAULT_LIMIT as SHARED_DEFAULT_LIMIT,
  DEFAULT_CURRENT_PAGE as SHARED_DEFAULT_CURRENT_PAGE,
  ENV,
  UPLOAD_CHECK_LIST as SHARED_UPLOAD_CHECK_LIST,
  ACCOUNT_TYPE,
  defaultTabMenuConfig,
} from '@dashboard-monorepo/shared';

export const DEFAULT_LIMIT = SHARED_DEFAULT_LIMIT;
export const DEFAULT_CURRENT_PAGE = SHARED_DEFAULT_CURRENT_PAGE;

export const TEST = ENV.TEST;
export const PROD = ENV.PROD;

export const ENV_CONFIG = {
  [TEST]: { key: TEST, displayText: 'Test' },
  [PROD]: { key: PROD, displayText: 'Prod' },
};

export const UPLOAD_CHECK_LIST = SHARED_UPLOAD_CHECK_LIST;

export const ACCOUNT_TYPES = {
  GLOBAL_PAYOUTS: ACCOUNT_TYPE.GLOBAL_PAYOUTS,
};

export const GENDER = {
  M: 'Male',
  F: 'Female',
};

export const menuConfig = defaultTabMenuConfig;
