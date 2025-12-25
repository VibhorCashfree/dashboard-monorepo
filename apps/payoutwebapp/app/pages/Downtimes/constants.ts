import _pick from 'lodash/pick';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

export enum STATUS {
  SCHEDULED = 'SCHEDULED',
  UNSCHEDULED = 'UNSCHEDULED',
}

const STATUSES = Object.keys(STATUS);

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Status Filter': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};
