import _pick from 'lodash/pick';
import _filter from 'lodash/filter';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';
import { STATUSES } from './constants';

export const getFilterMap = () => {
  const statuses = _filter(
    STATUSES,
    status =>
      !['PARTIALLY_APPROVED', 'PENDING_APPROVAL', 'MANUALLY_REJECTED'].includes(
        status,
      ),
  );

  const labelByStatus = _pick(LABEL_BY_STATUS, statuses);

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
