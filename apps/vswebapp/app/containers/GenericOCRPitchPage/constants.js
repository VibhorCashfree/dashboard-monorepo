export const MODAL_TYPES = {
  VERIFY: 'VERIFY',
  VALID: 'VALID',
  INVALID: 'INVALID',
  UNABLE_TO_VALIDATE: 'UNABLE_TO_VALIDATE',
};

export const CHECKLIST = [
  'Max file size: 5 MB',
  'File type: .png, .jpeg, .jpg, .pdf',
];

export const FILE_TYPE = 'image/*';

export const REQUIRED_FIELDS = ['document_type'];

export const DOCUMENT_OPTIONS = [
  { key: 'PAN', text: 'Pan', value: 'PAN' },
  { key: 'AADHAAR', text: 'Aadhaar', value: 'AADHAAR' },
  { key: 'VOTER_ID', text: 'Voter ID', value: 'VOTER_ID' },
  { key: 'VEHICLE_RC', text: 'Vehicle RC', value: 'VEHICLE_RC' },
  { key: 'DRIVING_LICENCE', text: 'Driving Licence', value: 'DRIVING_LICENCE' },
  { key: 'PASSPORT', text: 'Passport', value: 'PASSPORT' },
  {
    key: 'CANCELLED_CHEQUE',
    text: 'Cancelled Cheque',
    value: 'CANCELLED_CHEQUE',
  },
  {
    key: 'INVOICE',
    text: 'Invoice',
    value: 'INVOICE',
  },
];

export const FREE_CREDIT_RATES = {
  PAN: 'PAN_OCR_GENERIC',
  AADHAAR: 'AADHAAR_OCR_GENERIC',
  VOTER_ID: 'VOTER_ID_OCR',
  VEHICLE_RC: 'VEHICLE_RC_OCR',
  DRIVING_LICENCE: 'DRIVING_LICENCE_OCR',
  PASSPORT: 'PASSPORT_OCR',
  CANCELLED_CHEQUE: 'CANCELLED_CHEQUE_OCR',
  INVOICE: 'INVOICE_OCR',
};

export const FILE_UPLOAD_MODE = {
  FILE: 'file',
  URL: 'file_url',
};
