import moment from 'moment';

export const now = new Date();

export const TODAY = {
  displayText: 'Today',
  range: [
    moment()
      .startOf('day')
      .toDate(),
    now,
  ],
};

export const LAST_7_DAYS = {
  displayText: 'Last 7 days',
  range: [
    moment()
      .subtract(6, 'days')
      .startOf('day')
      .toDate(),
    now,
  ],
};

export const LAST_15_DAYS = {
  displayText: 'Last 15 days',
  range: [
    moment()
      .subtract(14, 'days')
      .startOf('day')
      .toDate(),
    now,
  ],
};

export const THIS_MONTH = {
  displayText: 'This Month',
  range: [
    moment()
      .startOf('month')
      .toDate(),
    now,
  ],
};

export const LAST_MONTH = {
  displayText: 'Last Month',
  range: [
    moment()
      .subtract(1, 'months')
      .startOf('month')
      .toDate(),
    moment()
      .subtract(1, 'months')
      .endOf('month')
      .toDate(),
  ],
};

export const LAST_1_YEAR = {
  displayText: 'Last 1 Year',
  range: [
    moment()
      .subtract(1, 'years')
      .startOf('day')
      .toDate(),
    now,
  ],
};

export const DATE_OPTIONS = [LAST_7_DAYS, THIS_MONTH, LAST_MONTH];

export const DATE_OPTIONS_WITH_TODAY = [TODAY].concat(DATE_OPTIONS);

export const FORMATS = {
  TIMESTAMP: 'DD MMM YYYY, hh:mm A',
  START_DATE: 'YYYY-MM-DD 00:00:00',
  END_DATE: 'YYYY-MM-DD 23:59:59',
  DATE_WITHOUT_TIME: 'YYYY-MM-DD',
  TIME: 'hh:mm A',
};

export const DEFAULT_VALUE = THIS_MONTH;

export const MIN_DATE = moment()
  .subtract(6, 'months')
  .toDate();
