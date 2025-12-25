// Adapters
import developers from '../developers';

const { from } = developers;

describe('developers adapters', () => {
  test('from()', () => {
    expect(from([])).toStrictEqual([]);

    expect(
      from([
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
