// Constants
import { HISTORY_LOG, TYPE_MAP } from './constants';
import { FORMATS } from 'constants/date';

// Helpers
import { formattedDate } from 'helpers/common';

export const getQuery = (filters, dateValue, type, searchBy, limit) => {
  const queryObj = {
    event: HISTORY_LOG[type].value,
    size: limit,
  };

  if (dateValue.range) {
    const [startDate, endDate] = dateValue.range;

    queryObj.startDate = formattedDate(startDate, FORMATS.START_DATE);
    queryObj.endDate = formattedDate(endDate, FORMATS.END_DATE);
  }

  if (isTypeAPIKeys()) {
    const userIds = Object.keys(filters);

    queryObj.userName = userIds.filter(v => v !== 'search');

    if (filters.search) {
      queryObj[searchBy] = filters.search;
    }
  }

  return queryObj;
};

export const isTypeAPIKeys = type => type === TYPE_MAP.API_KEYS;

export const showLoader = (data, users, type) =>
  !data && isTypeAPIKeys(type) && !users.length > 0;

export const pageChange = (currentPage, type) => {
  switch (type) {
    case 'NEXT':
      return currentPage + 1;
    case 'PREV':
      return currentPage - 1;
    default:
  }
};

export const getFormattedData = type => [
  {
    accessorKey: 'addedOn',
    header: 'Date & Time',
    cell: ({ addedOn }) => formattedDate(addedOn),
  },
  {
    accessorKey: 'value',
    header: 'Client ID',
    cell: row =>
      type === TYPE_MAP.PUBLIC_KEYS ? 'xxxxxxxxxxxxxxxx' : row.value,
  },
  { accessorKey: 'action', header: 'Action' },
  { accessorKey: 'userName', header: 'User' },
];
