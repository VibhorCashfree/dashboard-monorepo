import moment from 'moment';

// Constants
import { FORMATS } from 'constants/date';

export const rowPopup = (key, display) => (key ? display : '–');

export const formattedDate = (date, formatType = FORMATS.TIMESTAMP) =>
  date ? moment(date).format(formatType) : '–';

export const hasMounted = (hasMount, data) => {
  if (hasMount && data) {
    // eslint-disable-next-line no-useless-return
    return;
  }
};

export const getQuery = (filters, searchBy, limit) => {
  const status = Object.keys(filters);

  const queryObj = {
    status: status.filter(v => v !== 'search'),
    size: limit,
  };

  if (filters.search) {
    queryObj[searchBy] = filters.search;
  }

  return queryObj;
};
