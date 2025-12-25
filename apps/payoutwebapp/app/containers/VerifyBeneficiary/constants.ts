export const options = [
  { text: 'Cashgram ID', value: 'cashgramId' },
  {
    text: 'Beneficiary Name',
    value: 'name',
  },
  { text: 'Name At Bank', value: 'nameAtBank' },
  { text: 'Phone Number', value: 'phone' },
];

export enum MODAL_TYPE {
  VERIFY = 'VERIFY',
  REJECT = 'REJECT',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',

  EMPTY = '',
}

export const primaryKey = 'cashgramId';
