// Adapters
import notifications from '../notifications';

const { from } = notifications;

describe('notifications adapters', () => {
  test('from()', () => {
    expect(from([])).toStrictEqual([]);
    expect(
      from([
        {
          notifType: 'TRANSFER',
        },
        {
          notifType: 'BANK_VALIDATION',
        },
        {
          notifType: 'PO_ACCOUNT',
        },
        {
          notifType: 'PENDING_TRANSFER',
        },
        {
          notifType: 'BENEFICIARY',
        },
      ]),
    ).toStrictEqual([
      {
        notifType: 'TRANSFER',
      },
      {
        notifType: 'PENDING_TRANSFER',
      },
      {
        notifType: 'BENEFICIARY',
      },
    ]);
  });
});
