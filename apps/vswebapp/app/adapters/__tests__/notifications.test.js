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
          notifType: 'ACCOUNT',
        },
      ]),
    ).toStrictEqual([
      {
        notifType: 'BANK_VALIDATION',
      },
      {
        notifType: 'ACCOUNT',
      },
    ]);
  });
});
