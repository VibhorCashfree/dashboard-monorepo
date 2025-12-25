import moment from 'moment';
import _find from 'lodash/find';
import _get from 'lodash/get';

const DATE_WITH_MONTH = 'Do MMM';

const getDateChipText = range => {
  const [startDate, endDate] = range;

  return `${moment(startDate).format(DATE_WITH_MONTH)} - ${moment(
    endDate,
  ).format(DATE_WITH_MONTH)}`;
};

const getDateChipObject = range => ({
  key: 'RANGE',
  text: getDateChipText(range),
});

const getSearchChipObject = (options, searchBy, value) => {
  const key = 'search';
  const searchByOption = _find(options, { value: searchBy });

  // Add null check to prevent the error
  const text = searchByOption
    ? `${searchByOption.text}: ${value}`
    : `${searchBy}: ${value}`;

  return { key, text };
};

const getDateChip = dateValue =>
  dateValue.range ? [getDateChipObject(dateValue.range)] : [];

const getSearchChips = (filters, options, searchBy) =>
  filters.search
    ? [getSearchChipObject(options, searchBy, filters.search)]
    : [];

const getFilterChips = (filters, labelByStatus, extra) =>
  Object.keys(filters)
    .filter(key => key !== 'search')
    .map(key => {
      let text;

      if (labelByStatus[key]) {
        text = labelByStatus[key];
      } else if (_get(extra, 'values', []).includes(key)) {
        text = `${_get(extra, 'prefix')}: ${key}`;
      }

      return { key, text };
    });

export const getChips = (filterObj, options, labelByStatus = {}, extra) => {
  const { dateValue, filters, searchBy } = filterObj;

  const dateChip =
    dateValue && dateValue.displayText !== 'This Month'
      ? getDateChip(dateValue)
      : [];

  const searchChips = searchBy
    ? getSearchChips(filters, options, searchBy)
    : [];

  const filterChips = getFilterChips(filters, labelByStatus, extra);

  return dateChip.concat(searchChips).concat(filterChips);
};
