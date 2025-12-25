export const INITIAL_AUTH_INFO = {
  errorType: '',
  timerInSeconds: 30,
};

export const MAX_LIMIT_ERROR = {
  VERIFY: 'VERIFY_2FA_MAX_LIMIT_REACHED',
  SEND: 'SEND_OTP_MAX_LIMIT_REACHED',
};

export const INVALID_OTP = 'INVALID_CODE';

export const REFRESH_INTERVAL = 2000;

export const descriptions = [
  'Send money instantly to beneficiary bank accounts, UPI, cards, or supported wallets.',
  'Easily settle payments to your vendors, process refunds, process on-demand wage payments, disburse loans, and much more with Payouts.',
];

export const features = [
  {
    heading: 'Add Funds',
    body: 'Add funds to your Cashfree Recharge Account or connect your bank account with Cashfree.',
  },
  {
    heading: 'Upload Beneficiary Details',
    body: 'Upload beneficiaries account details in a batch file or initiate payouts for each beneficiary individually. Specify the amount and transfer mode - IMPS, NEFT, RTGS, UPI, Wallets, and Cards.',
  },
  {
    heading: 'Beneficiary Accounts get Credited',
    body: 'Amount specified in the batch file gets credited to beneficiaries.',
  },
];
