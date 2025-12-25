// Constants
import { FS_DISPLAY_TYPE, LABEL_BY_DISPLAY_TYPE } from 'constants/fundSources';

export const addOptions = [
  {
    text: 'Payout Aggregator',
    value: 'AGGREGATOR',
    description: 'Wallet/connected acc. from Razorypay, juspay etc.',
  },
  {
    text: LABEL_BY_DISPLAY_TYPE[FS_DISPLAY_TYPE.BANK_ACCOUNT],
    value: FS_DISPLAY_TYPE.BANK_ACCOUNT,
    description: 'This will be added to your cashfree account.',
  },
];
