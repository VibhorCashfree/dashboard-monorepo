// Constants
import { UTR_LABEL } from 'constants/common';

// Utils
import Region from 'utils/region';

export const options = [
  { text: 'Transfer ID', value: 'transferId' },
  { text: 'CF Ref. ID', value: 'referenceId' },
  { text: UTR_LABEL[Region.get()], value: 'utr' },
];
