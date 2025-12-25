// Constants
import { ALERT_BY_STATUS } from 'constants/status';

export const getStatusColor = (status, colors) =>
  colors[ALERT_BY_STATUS[status]];
