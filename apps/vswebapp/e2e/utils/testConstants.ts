// utils/testConstants.ts

export const BANK_ACCOUNT_TEST_DATA = {
  accountNumber: "026291800001191",
  ifscCode: "YESB0000262",
  accountHolderName: "john doe",
};
export const BANK_ACCOUNT_TEST_DATA_INAVLID = {
  accountNumber: "026291800001190",
  ifscCode: "YESB0000262",
  accountHolderName: "john doe",
  lessThanMin: '12345',
  moreThanMax: '12345678901234567890123456789012345678901',
  invalidFormat: '12340000262',
 // 41 chars

};

export const MENU_ITEMS = {
  bankAccount: /^Bank Account$/,
  aadhaarPan: 'Aadhaar/PAN',
  pan: /^PAN$/,
};

export const BUTTONS = {
  verifyBankAccount: "Verify Bank Account",
  verify: "Verify",
  close: "Close",
  verifyPan: 'Verify PAN',
  searchFilter: 'Search & Filter',
  apply: 'Apply',
  back: 'Back',
  uploadFile: "Upload File",

};
export const PAN_TEST_DATA = {
  panNumber: "ABCPV1234D",
  invalidPan: "DEFPV0126D",
  incorrectPan:"899",
};
export const FIELD_LABELS = [
  'PAN',
  'Name Registered',
  'PAN Type',
  'Name Match Score',
  'Name Pan Card',
  'Aadhaar Seeding Status',
  'Name Provided',
  'Valid',
  'Message',
  'Last updated at',
  'Pan Status',
  'Aadhaar Seeding Status Description',
];
export const BANK_FIELD_LABELS = [
  'Bank Account is Valid',
  'Name Provided',
  'IFSC',
  'Bank A/c No.',
  'Account Status Code',
  'Name at Bank',
  'Branch',
  'Reference Id',
  'UTR',
  'Bank',
  'City',
  'MICR',
  'Name Match Result',
];

export const ERROR_MESSAGES = {
  accountMin: 'Account number should include a minimum 6 characters.',
  accountMax: 'Account number can include a maximum of 40 characters.',
  invalidIFSC: 'IFSC is not in correct format.'
};
export const PAN_MESSAGES = {
  invalid: "PAN is Invalid",
  valid: "PAN is Valid",
  minLength: "PAN should include 10",
};
