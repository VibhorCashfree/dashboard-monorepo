export const INTERNAL_SERVER_ERROR =
  'Something went wrong. Try again after some time.';

export const MOCK_ERROR = 'Mock Error';

export const NO_TOAST = {
  TITLES: [
    'JWT_TOKEN_INVALID',
    'VERIFY_OTP',
    'VERIFY_G2FA',
    'REQUEST_SAME_BENE',
    'VERIFY_2FA_MAX_LIMIT_REACHED',
    'SEND_OTP_MAX_LIMIT_REACHED',
    'USER_NOT_AUTHORIZED',
    'RECHARGE_ALREADY_EXISTS',
  ],
  MESSAGES: [
    'IP_NOT_WHITELISTED',
    'resource not found',
    'Payout Account not authorized',
  ],
  APIS: ['/count', '/balance'],
};

export const ERROR_BY_MESSAGE: StringObject = {
  INVALID_ACCOUNT_FAIL: 'Incorrect account number.',
  INVALID_IFSC_FAIL: 'Incorrect IFSC.',
  INVALID_CUSTOMER_ID: 'Incorrect customer ID.',
  INVALID_ACCT_HOLDER_NAME: 'Incorrect account holder name.',
  BANK_ACCOUNT_EXISTS: 'Bank account already exists.',
  FUND_SOURCE_NAME_EXISTS: 'Name already exists.',
  REGISTRATION_ALREADY_DONE: 'Corporate is already registered.',
  INVALID_BANK_LOGIN_CREDENTIALS:
    'Invalid Alias. Mandatory to provide correct Alias if configured for this User ID.',
  ERROR_FETCHING_STATUS: 'Error fetching status at bank.',
};
