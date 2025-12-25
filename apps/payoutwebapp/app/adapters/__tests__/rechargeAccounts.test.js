// Adapters
import rechargeAccounts from '../rechargeAccounts';

const { from } = rechargeAccounts;

describe('rechargeAccounts adapters', () => {
  test('from()', () => {
    expect(from([])).toStrictEqual([]);

    expect(
      from([
        {
          accountNumber: '707070107BVJ',
          ifsc: 'YESB0CMSNOC',
          bankName: 'Yes bank',
        },
        {
          accountNumber: '34978321547298',
          ifsc: 'KKBK0000001',
          bankName: 'Kotak bank',
        },
      ]),
    ).toEqual([]);

    expect(
      from([
        {
          accountNumber: '808080107BVJ',
          ifsc: 'YESB0CMSNOC',
          bankName: 'Yes bank',
        },
        {
          accountNumber: '34978321547298',
          ifsc: 'KKBK0000001',
          bankName: 'Kotak bank',
        },
      ]),
    ).toStrictEqual([]);
  });
});
