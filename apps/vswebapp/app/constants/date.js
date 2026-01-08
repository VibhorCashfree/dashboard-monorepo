import moment from 'moment';
import { DATE_RANGES, FORMATS as SHARED_FORMATS } from '@dashboard-monorepo/shared';

export const now = new Date();

export const TODAY = DATE_RANGES.TODAY;
export const LAST_7_DAYS = DATE_RANGES.LAST_7_DAYS;
export const LAST_15_DAYS = DATE_RANGES.LAST_15_DAYS;
export const THIS_MONTH = DATE_RANGES.THIS_MONTH;
export const LAST_MONTH = DATE_RANGES.LAST_MONTH;
export const LAST_1_YEAR = DATE_RANGES.LAST_1_YEAR;

export const DATE_OPTIONS = [LAST_7_DAYS, THIS_MONTH, LAST_MONTH];

export const DATE_OPTIONS_WITH_TODAY = [TODAY].concat(DATE_OPTIONS);

export const FORMATS = SHARED_FORMATS;

export const DEFAULT_VALUE = THIS_MONTH;

export const MIN_DATE = moment()
  .subtract(6, 'months')
  .toDate();
