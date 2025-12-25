import users from '../developers';

describe('developers adapters', () => {
  test('users()', () => {
    expect(users([])).toStrictEqual([]);
    expect(
      users([
        {
          a: 1,
          b: 2,
          userName: 'abc',
        },
        {
          a: 3,
          b: 4,
          userName: 'xyz',
        },
      ]),
    ).toStrictEqual(['abc', 'xyz']);
  });
});
