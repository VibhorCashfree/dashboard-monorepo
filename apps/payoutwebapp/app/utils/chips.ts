import moment from 'moment';
import _find from 'lodash/find';

// Constants
import { DATE_RANGE } from 'constants/date';

const DATE_WITH_MONTH = 'Do MMM';

const getDateChipText = (range: [Date, Date]) => {
  const [startDate, endDate] = range;

  return `${moment(startDate).format(DATE_WITH_MONTH)} - ${moment(
    endDate,
  ).format(DATE_WITH_MONTH)}`;
};

const getDateChipObject = (range: [Date, Date]) => ({
  key: 'RANGE',
  text: getDateChipText(range),
});

const getSearchChipObject = (
  options: { text: string; value: string }[],
  searchBy: string,
  value: string,
) => {
  const key = 'search';
  const searchByOption = _find(options, { value: searchBy });
  const text = `${searchByOption?.text}: ${value}`;

  return { key, text };
};

const getDateChip = (dateValue: DateRangeValue) =>
  dateValue.displayText === DATE_RANGE.ALL_TIME.displayText
    ? []
    : [getDateChipObject(dateValue.range)];

const getSearchChips = (
  filters: AnyObject,
  options: { text: string; value: string }[],
  searchBy: string,
) =>
  filters.search
    ? [getSearchChipObject(options, searchBy, filters.search)]
    : [];

const getFilterChips = (
  filters: AnyObject,
  labelByStatus: StringObject,
  extra: AnyObject[] = [],
) =>
  Object.keys(filters)
    .filter((key) => key !== 'search')
    .map((key) => {
      let text;

      if (labelByStatus[key]) {
        text = labelByStatus[key];
      } else {
        const item = extra.find(({ values }: any) => values.includes(key));

        if (item) {
          if (item.source) {
            text = `${item.prefix}: ${item.source[key].displayName}`;
          } else {
            text = `${item.prefix}: ${key}`;
          }
        } else {
          text = '';
        }
      }

      return { key, text };
    });

export const getChips = (
  filterObj: AnyObject,
  options: { text: string; value: string }[],
  labelByStatus: StringObject = {},
  extra?: AnyObject[],
) => {
  const { dateValue, filters, searchBy } = filterObj;

  const dateChip = dateValue ? getDateChip(dateValue) : [];

  const searchChips = searchBy
    ? getSearchChips(filters, options, searchBy)
    : [];

  const filterChips = getFilterChips(filters, labelByStatus, extra);

  return dateChip.concat(searchChips).concat(filterChips);
};
