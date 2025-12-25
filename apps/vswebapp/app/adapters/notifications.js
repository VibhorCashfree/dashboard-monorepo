import _filter from 'lodash/filter';

// Constants
import { VALID_REPORT_TYPES } from 'constants/settings';

const from = entries =>
  _filter(entries, report => VALID_REPORT_TYPES.includes(report.notifType));

export default {
  from,
};
