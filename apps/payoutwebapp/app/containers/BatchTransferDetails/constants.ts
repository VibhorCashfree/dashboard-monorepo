// Constants
import { UTR_LABEL } from 'constants/common';

// Utils
import Region from 'utils/region';

export const STATUSES = [
  'PENDING',
  'FAILED',
  'REVERSED',
  'SUCCESS',
  'PROCESSING',
  'CANCELLED',
  'PARTIALLY_APPROVED',
  'PENDING_APPROVAL',
  'MANUALLY_REJECTED',
  'REJECTED',
];

export const APPROVE_STATUSES = ['PENDING_APPROVAL', 'PARTIALLY_APPROVED'];

export const keysMap = {
  CFTRANSFER_ACCOUNT: {
    PROCESSED: [
      'addedOn',
      'transferId',
      'bankAccount',
      'ifsc',
      'transferMode',
      'referenceId',
      'utr',
      'amount',
      'ackd',
      'status',
    ],
    OTHERS: [
      'email',
      'transferId',
      'bankAccount',
      'ifsc',
      'remarks',
      'amount',
      'transferMode',
      'approvals',
      'status',
    ],
  },
  CFTRANSFER_BENEID: {
    PROCESSED: [
      'addedOn',
      'transferId',
      'beneficiaryId',
      'referenceId',
      'transferMode',
      'utr',
      'amount',
      'ackd',
      'status',
    ],
    OTHERS: [
      'transferId',
      'beneficiaryId',
      'transferMode',
      'amount',
      'remarks',
      'approvals',
      'status',
    ],
  },
  CFTRANSFER_BENEID_UAE: {
    PROCESSED: [
      'addedOn',
      'transferId',
      'beneficiaryId',
      'referenceId',
      'transferMode',
      'utr',
      'amount',
      'ackd',
      'status',
    ],
    OTHERS: [
      'transferId',
      'beneficiaryId',
      'transferMode',
      'amount',
      'remarks',
      'approvals',
      'status',
    ],
  },
  CFTRANSFER_UPI: {
    PROCESSED: [
      'addedOn',
      'transferId',
      'vpa',
      'referenceId',
      'utr',
      'amount',
      'ackd',
      'status',
    ],
    OTHERS: [
      'transferId',
      'name',
      'email',
      'vpa',
      'amount',
      'remarks',
      'approvals',
      'status',
    ],
  },
  CFTRANSFER_PAYTM: {
    PROCESSED: [
      'addedOn',
      'transferId',
      'phone',
      'referenceId',
      'utr',
      'amount',
      'ackd',
      'status',
    ],
    OTHERS: [
      'transferId',
      'phone',
      'transferMode',
      'amount',
      'remarks',
      'approvals',
      'status',
    ],
  },
  CFTRANSFER_AMZN_UPI: {
    PROCESSED: [
      'addedOn',
      'transferId',
      'phone',
      'referenceId',
      'utr',
      'amount',
      'ackd',
      'status',
    ],
    OTHERS: [
      'transferId',
      'phone',
      'transferMode',
      'amount',
      'remarks',
      'approvals',
      'status',
    ],
  },
  CFTRANSFER_IBAN: {
    PROCESSED: [
      'addedOn',
      'transferId',
      'beneficiaryId',
      'referenceId',
      'transferMode',
      'utr',
      'amount',
      'ackd',
      'status',
    ],
    OTHERS: [
      'transferId',
      'beneficiaryId',
      'transferMode',
      'amount',
      'remarks',
      'approvals',
      'status',
    ],
  },
};

export const options = [
  { text: 'Transfer ID', value: 'transferId' },
  { text: 'Bank A/c No.', value: 'bankAccount' },
  { text: 'Beneficiary ID', value: 'beneId' },
  { text: UTR_LABEL[Region.get()], value: 'utr' },
  { text: 'Phone Number', value: 'phone' },
  { text: 'Reference ID', value: 'referenceId' },
];

export const extraChipConfig = [
  {
    prefix: 'Transfer Ackd.',
    values: ['Yes', 'No'],
  },
];

export enum MODAL_TYPE {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EMPTY = '',
}

export const primaryKey = 'id';
