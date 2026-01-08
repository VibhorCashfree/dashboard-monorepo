import moment from 'moment';

const now = new Date();

export type DateRangeValue = {
  displayText: string;
  range: [Date, Date];
};

export const DATE_RANGES: Record<string, DateRangeValue> = {
  LAST_30_MINS: {
    displayText: 'Last 30 minutes',
    range: [moment().subtract(30, 'minutes').startOf('minute').toDate(), now],
  },
  TODAY: {
    displayText: 'Today',
    range: [moment().startOf('day').toDate(), now],
  },
  LAST_7_DAYS: {
    displayText: 'Last 7 days',
    range: [moment().subtract(6, 'days').startOf('day').toDate(), now],
  },
  LAST_15_DAYS: {
    displayText: 'Last 15 days',
    range: [moment().subtract(14, 'days').startOf('day').toDate(), now],
  },
  LAST_30_DAYS: {
    displayText: 'Last 30 days',
    range: [moment().subtract(29, 'days').startOf('day').toDate(), now],
  },
  THIS_MONTH: {
    displayText: 'This Month',
    range: [moment().startOf('month').toDate(), now],
  },
  LAST_MONTH: {
    displayText: 'Last Month',
    range: [
      moment().subtract(1, 'months').startOf('month').toDate(),
      moment().subtract(1, 'months').endOf('month').toDate(),
    ],
  },
  THIS_YEAR: {
    displayText: 'This Year',
    range: [moment().startOf('year').toDate(), now],
  },
  LAST_1_YEAR: {
    displayText: 'Last 1 Year',
    range: [moment().subtract(1, 'years').startOf('day').toDate(), now],
  },
  ALL_TIME: {
    displayText: 'All Time',
    range: [moment().subtract(1, 'years').startOf('day').toDate(), now],
  },
};

export const FORMATS = {
  TIMESTAMP: 'DD MMM YYYY, hh:mm A',
  DATE: 'YYYY-MM-DD',
  DATE_WITHOUT_TIME: 'YYYY-MM-DD',
  START_DATE: 'YYYY-MM-DD 00:00:00',
  END_DATE: 'YYYY-MM-DD 23:59:59',
  START_DATE_WITH_MINS: 'YYYY-MM-DD HH:mm:00',
  END_DATE_WITH_MINS: 'YYYY-MM-DD HH:mm:59',
  TIME: 'hh:mm A',
};
