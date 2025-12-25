import _intersection from 'lodash/intersection';

// Constants
import { REGION } from 'constants/common';
import { LABEL_BY_MODE } from './constants';

// Utils
import Region from 'utils/region';

// Types
import type { Mode } from './types';

export const getModeOptions = (
  beneModes: Mode[],
  fundSourceModes: Mode[],
  preferences: { enableTransferTypes: boolean },
) => {
  if (Region.get() === REGION.IN) {
    if (preferences.enableTransferTypes) {
      if (beneModes.includes('banktransfer')) {
        beneModes = beneModes
          .filter((mode) => mode !== 'banktransfer')
          .concat(['imps', 'neft', 'rtgs']);
      }

      if (fundSourceModes.includes('banktransfer')) {
        fundSourceModes = fundSourceModes
          .filter((mode) => mode !== 'banktransfer')
          .concat(['imps', 'neft', 'rtgs']);
      }
    }
  }

  const modes = _intersection(beneModes, fundSourceModes);

  return modes.map((mode) => ({
    text: LABEL_BY_MODE[mode],
    value: mode,
  }));
};

export const getPurposeCodeOptions = () => [
  { text: 'ACM', value: 'ACM' },
  { text: 'CCP', value: 'CCP' },
  { text: 'EMI', value: 'EMI' },
];
