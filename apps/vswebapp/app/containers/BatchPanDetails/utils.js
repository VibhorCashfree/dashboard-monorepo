import _pick from 'lodash/pick';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';
import { STATUSES } from './constants';

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
