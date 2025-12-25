import moment from 'moment';
import _uniq from 'lodash/uniq';

// Constants
import { DATE_RANGE } from 'constants/date';
import { MENU, PATH_BY_MENU } from 'constants/menuItems';
import { MODE_BY_PREF, LABEL_BY_MODE, UNIT } from './constants';

// Types
import type { ModePref, Mode } from './types';

export const getModeOptions = (enabledModes: ModePref[]) => {
  const modes = _uniq(
    enabledModes.map((pref) => MODE_BY_PREF[pref] || []).flat(),
  );

  return modes.map((mode) => ({
    text: LABEL_BY_MODE[mode as Mode],
    value: mode,
  }));
};

export const getUnit = (dateValue: DateRangeValue) => {
  if (dateValue.displayText === DATE_RANGE.LAST_30_MINS.displayText) {
    return UNIT.MINUTES;
  }

  const [start, end] = dateValue.range;
  const hours = moment(end).diff(moment(start), 'hours');

  return hours > 24 ? UNIT.DAYS : UNIT.HOURS;
};

export const getToUrl = (
  status: string,
  type: string,
  options: { startDate: string; endDate: string },
) => {
  const queryParams = options && new URLSearchParams(options).toString();

  if (status === 'BLOCKED') {
    return `/${
      PATH_BY_MENU[MENU.RISK_SHIELD]
    }/overview/blocked-transfers?${queryParams}`;
  }

  return `/${type}/all?status=${status}&${queryParams}`;
};
