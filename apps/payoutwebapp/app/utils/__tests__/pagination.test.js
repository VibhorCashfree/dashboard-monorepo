import { getCursor, getPaginationInfo } from '../pagination';

describe('pagination helpers', () => {
  test('getCursor()', () => {
    expect(
      getCursor(
        {
          data: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        },
        10,
        9,
      ),
    ).toStrictEqual(['previousId', 1]);

    expect(
      getCursor(
        {
          data: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        },
        9,
        10,
      ),
    ).toStrictEqual(['lastId', 2]);
  });

  test('getPaginationInfo()', () => {
    expect(getPaginationInfo({}, 1)).toStrictEqual({
      rowData: [],
      currentPageCount: 0,
      totalCount: 0,
      hasPrev: false,
      hasNext: false,
    });

    expect(
      getPaginationInfo(
        {
          data: [{ a: 1 }],
          count: 1,
          hasNext: true,
        },
        1,
      ),
    ).toStrictEqual({
      rowData: [{ a: 1 }],
      currentPageCount: 1,
      totalCount: 1,
      hasPrev: false,
      hasNext: true,
    });
  });
});
