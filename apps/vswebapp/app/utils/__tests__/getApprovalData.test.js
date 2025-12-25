import getApprovalData from '../getApprovalData';

describe('getApprovalData helper', () => {
  test('getApprovalData()', () => {
    expect(getApprovalData([], [])).toStrictEqual([]);
  });

  test('getApprovalData()', () => {
    expect(getApprovalData([{ a: 1, b: 2 }], [])).toStrictEqual([
      {
        a: 1,
        b: 2,
        type: 'success',
      },
    ]);
  });

  test('getApprovalData()', () => {
    expect(getApprovalData([], [{ a: 1, b: 2 }])).toStrictEqual([
      {
        a: 1,
        b: 2,
        type: 'danger',
      },
    ]);
  });

  test('getApprovalData()', () => {
    expect(getApprovalData([{ a: 1, b: 2 }], [{ a: 1, b: 2 }])).toStrictEqual([
      {
        a: 1,
        b: 2,
        type: 'success',
      },
      {
        a: 1,
        b: 2,
        type: 'danger',
      },
    ]);
  });
});
