import _filter from 'lodash/filter';

type Response = {
  notifType: string;
};

const from = (response: Response[]) =>
  _filter(response, (report) =>
    // not the same as report types
    [
      'BENEFICIARY',
      'PENDING_TRANSFER',
      'TRANSFER',
      'REVERSED_TRANSFER',
      'ACCOUNT',
      'CASHGRAM',
    ].includes(report.notifType),
  );

export default {
  from,
};
