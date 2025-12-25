import moment from 'moment';

const now = new Date();

const ALL_TIME: DateRangeValue = {
  displayText: 'All Time',
  range: [moment().subtract(1, 'years').startOf('day').toDate(), now],
};

const LAST_30_MINS: DateRangeValue = {
  displayText: 'Last 30 minutes',
  range: [moment().subtract(30, 'minutes').startOf('minute').toDate(), now],
};

const TODAY: DateRangeValue = {
  displayText: 'Today',
  range: [moment().startOf('day').toDate(), now],
};

const LAST_7_DAYS: DateRangeValue = {
  displayText: 'Last 7 days',
  range: [moment().subtract(6, 'days').startOf('day').toDate(), now],
};

const LAST_15_DAYS: DateRangeValue = {
  displayText: 'Last 15 days',
  range: [moment().subtract(14, 'days').startOf('day').toDate(), now],
};

const LAST_30_DAYS: DateRangeValue = {
  displayText: 'Last 30 days',
  range: [moment().subtract(29, 'days').startOf('day').toDate(), now],
};

const LAST_MONTH: DateRangeValue = {
  displayText: 'Last Month',
  range: [
    moment().subtract(1, 'months').startOf('month').toDate(),
    moment().subtract(1, 'months').endOf('month').toDate(),
  ],
};

const THIS_YEAR: DateRangeValue = {
  displayText: 'This Year',
  range: [moment().startOf('year').toDate(), now],
};

const LAST_1_YEAR: DateRangeValue = {
  displayText: 'Last 1 Year',
  range: [moment().subtract(1, 'years').startOf('day').toDate(), now],
};

export const DATE_RANGE = {
  LAST_30_MINS,
  TODAY,
  ALL_TIME,
  LAST_7_DAYS,
  LAST_15_DAYS,
  LAST_30_DAYS,
  LAST_MONTH,
  THIS_YEAR,
  LAST_1_YEAR,
};

export const DATE_RANGE_OPTIONS = [
  DATE_RANGE.LAST_1_YEAR,
  // DATE_RANGE.ALL_TIME,
  DATE_RANGE.LAST_7_DAYS,
  DATE_RANGE.LAST_15_DAYS,
  DATE_RANGE.LAST_MONTH,
];

export const [, DEFAULT_VALUE] = DATE_RANGE_OPTIONS;

export const FORMATS = {
  TIMESTAMP: 'DD MMM YYYY, hh:mm A',
  DATE: 'YYYY-MM-DD',
  START_DATE: 'YYYY-MM-DD 00:00:00',
  END_DATE: 'YYYY-MM-DD 23:59:59',
  START_DATE_WITH_MINS: 'YYYY-MM-DD HH:mm:00',
  END_DATE_WITH_MINS: 'YYYY-MM-DD HH:mm:59',
  TIME: 'hh:mm A',
};
