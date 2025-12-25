import _pick from 'lodash/pick';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

const STATUSES = [
  'PAYOUT_TRANSFER',
  'BANK_TRANSFER',
  'PG_INSTANT_SETTLEMENT',
  'UPIDETAILS_VALIDATION',
  'TRANSFER_REVERSAL',
  'SELF_WITHDRAWAL',
  'AUTOCOLLECT_SETTLEMENT',
  'PG_SETTLEMENT',
  'INTERNAL_TRANSFER_OUT',
  'INTERNAL_TRANSFER_IN',
  'BANKDETAILS_VALIDATION',
  'PANDETAILS_VERIFICATION',
  'AADHAAR_VERIFICATION',
  'BANKVALIDATION_CREDIT',
  'GSTINDETAILS_VERIFICATION',
  'OFFLINE_AADHAAR_V',
];

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Event Type': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};
