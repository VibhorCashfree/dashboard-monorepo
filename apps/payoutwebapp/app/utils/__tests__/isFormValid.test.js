import isFormValid from '../isFormValid';

describe('isFormValid helpers', () => {
  test('isFormValid()', () => {
    expect(
      isFormValid(
        {
          a: 1,
          b: 2,
        },
        {},
        [],
      ),
    ).toBe(true);

    expect(
      isFormValid(
        {
          a: 1,
          b: 2,
        },
        {
          message: 'something went wrong',
        },
        [],
      ),
    ).toBe(false);

    expect(
      isFormValid(
        {
          a: 1,
          b: 2,
        },
        {},
        ['c'],
      ),
    ).toBe(false);
  });
});
