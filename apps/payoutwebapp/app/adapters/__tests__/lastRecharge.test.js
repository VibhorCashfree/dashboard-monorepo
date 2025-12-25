// Adapters
import lastRecharge from '../lastRecharge';

const { from } = lastRecharge;

describe('lastRecharge adapters', () => {
  test('from()', () => {
    expect(from(null)).toStrictEqual({});

    expect(from([])).toStrictEqual({});

    expect(
      from([
        {
          addedOn: '2022-09-13T19:13:53+05:30',
          updatedOn: '2022-09-13T19:14:30+05:30',
          amount: '10',
          rechargedAmount: '9.72',
          serviceCharge: '0.24',
          serviceTax: '0.04',
          status: 'SUCCESS',
          reason: '',
          utr: '1896059491',
          id: 847977,
        },
        {
          addedOn: '2022-09-13T19:12:32+05:30',
          updatedOn: '2022-09-13T19:13:03+05:30',
          amount: '10',
          rechargedAmount: '9.72',
          serviceCharge: '0.24',
          serviceTax: '0.04',
          status: 'SUCCESS',
          reason: '',
          utr: '1896058108',
          id: 847972,
        },
      ]),
    ).toStrictEqual({
      depositTime: '2022-09-13T19:14:30+05:30',
      amount: '10',
      rechargedAmount: '9.72',
      serviceCharge: '0.24',
      serviceTax: '0.04',
      status: 'SUCCESS',
      utr: '1896059491',
    });
  });
});
