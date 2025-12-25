import freeTrial from '../freeTrial';

const { from } = freeTrial;

describe('freeTrial adapters', () => {
  test('from()', () => {
    expect(
      from({
        amount: '1.13',
        expiryDate: '2093-07-04 17:47:16',
        freeCreditsRedeemed: true,
      }),
    ).toStrictEqual({ amount: '1.13', valid: true });

    expect(
      from({
        amount: '1.13',
        expiryDate: '2093-07-04 17:47:16',
        freeCreditsRedeemed: false,
      }),
    ).toStrictEqual({ amount: '1.13', valid: false });

    expect(
      from({
        amount: '1.13',
        expiryDate: '',
        freeCreditsRedeemed: true,
      }),
    ).toStrictEqual({ amount: '1.13', valid: true });
  });
});
