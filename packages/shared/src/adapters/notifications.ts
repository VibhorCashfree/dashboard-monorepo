import _filter from 'lodash/filter';

const VALID_REPORT_TYPES = [
  'BENEFICIARY',
  'PENDING_TRANSFER',
  'TRANSFER',
  'REVERSED_TRANSFER',
  'ACCOUNT',
  'CASHGRAM',
];

type Response = {
  notifType: string;
};

export const from = (response: Response[]) =>
  _filter(response, (report) => VALID_REPORT_TYPES.includes(report.notifType));

export default {
  from,
};
