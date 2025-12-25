import listing from '../listing';

const { to, from } = listing;

describe('listing adapters', () => {
  test('to()', () => {
    expect(to({})).toStrictEqual({ size: NaN });
    expect(to({ size: 1 })).toStrictEqual({ size: 2 });
  });

  test('from()', () => {
    expect(from([], {})).toStrictEqual({ data: [], hasNext: false });
    expect(from([], {}, { extra: true })).toStrictEqual({
      data: [],
      hasNext: false,
      extra: true,
    });
    expect(from([1, 2, 3], { previousId: '0', size: 2 })).toStrictEqual({
      data: [1, 2],
      hasNext: true,
    });
    expect(from([1, 2, 3], { previousId: '0', size: 4 })).toStrictEqual({
      data: [1, 2, 3],
      hasNext: false,
    });
  });
});
