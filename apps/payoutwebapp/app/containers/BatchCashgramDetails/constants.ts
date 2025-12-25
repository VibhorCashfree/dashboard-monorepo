export const STATUSES = [
  'ACTIVE',
  'OPENED',
  'PENDING',
  'REDEEMED',
  'EXPIRED',
  'TRANSFER_REVERSAL',
  'VERIFICATION_PENDING',
  'PROCESSING',
  'CANCELLED',
  'PARTIALLY_APPROVED',
  'PENDING_APPROVAL',
  'MANUALLY_REJECTED',
  'REJECTED',
];

export const APPROVE_STATUSES = ['PENDING_APPROVAL', 'PARTIALLY_APPROVED'];

export const options = [
  { text: 'Cashgram ID', value: 'cashgramId' },
  { text: 'Phone Number', value: 'phone' },
];

export enum MODAL_TYPE {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EMPTY = '',
}

export const primaryKey = 'id';
