// Constants
import { UTR_LABEL } from 'constants/common';

// Utils
import Region from 'utils/region';

export const options = [
  { text: 'Transfer ID', value: 'transferId' },
  { text: 'Bank Account', value: 'bankAccount' },
  { text: 'Beneficiary ID', value: 'beneficiaryId' },
  { text: UTR_LABEL[Region.get()], value: 'utr' },
  { text: 'Reference ID', value: 'referenceId' },
];

export enum MODAL_TYPE {
  VERIFY = 'VERIFY',
  REJECT = 'REJECT',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  EMPTY = '',
}

export const primaryKey = 'referenceId';
