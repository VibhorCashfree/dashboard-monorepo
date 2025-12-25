import _pick from 'lodash/pick';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';
import { REGION } from 'constants/common';
import { STATUSES } from './constants';

// Utils
import Region from 'utils/region';

export const getFilterMap = () => {
  const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

  const filtersConfig = {
    Status: {
      columns: 2,
      items: Object.keys(labelByStatus),
    },
  };

  return {
    labelByStatus,
    filtersConfig,
  };
};

export const getSearchOptions = () => {
  const region = Region.get();

  if (region === REGION.AE) {
    return [
      { text: 'Beneficiary ID', value: 'beneId' },
      { text: 'Beneficiary Phone No.', value: 'phone' },
      { text: 'Account IBAN', value: 'iban' },
    ];
  }

  return [
    { text: 'Beneficiary ID', value: 'beneId' },
    { text: 'Beneficiary Phone No.', value: 'phone' },
    { text: 'Bank A/c Number', value: 'bankAccount' },
  ];
};
