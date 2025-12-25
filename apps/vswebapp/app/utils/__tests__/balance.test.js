const { getBalanceMeta } = require('utils/balance');

describe('Balance helpers', () => {
  test('getBalanceMeta()', () => {
    expect(
      getBalanceMeta({
        balance: 10,
        fundsOnHold: 20,
        overdraft: 30,
      }),
    ).toStrictEqual({
      'Account Balance': '₹ 10.00',
      'Funds on Hold': '₹ 20.00',
      'Overdraft Balance': '₹ 30.00',
    });

    expect(
      getBalanceMeta({
        balance: -10,
        fundsOnHold: 20,
        overdraft: 30,
      }),
    ).toStrictEqual({
      'Account Balance': '₹ 0.00',
      'Funds on Hold': '₹ 20.00',
      'Overdraft Balance': '₹ 20.00',
    });
  });
});
