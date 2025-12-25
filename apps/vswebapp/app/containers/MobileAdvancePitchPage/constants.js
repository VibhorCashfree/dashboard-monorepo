export const MODAL_TYPES = {
  RETRIEVE: 'RETRIEVE',
  VALID: 'VALID',
  ADVANCE_VALID: 'ADVANCE_VALID',
  INVALID: 'INVALID',
  FAILED: 'FAILED',
};

export const REQUIRED_FIELDS = ['phoneNumber'];

const radioOptions = [
  { label: 'Lite', name: 'retriveType', value: 'lite', checked: true },
  {
    label: 'Advanced',
    name: 'retriveType',
    value: 'advance',
    checked: false,
  },
];

export const INITIAL_FORM_STATE = { retriveTypeOptions: radioOptions };

export const MOBILE_360_LITE_DOC =
  'https://docs.cashfree.com/reference/mobile-360-lite';

export const MOBILE_360_ADVANCE_DOC =
  'https://docs.cashfree.com/reference/vrsmobile360advanceverification';
