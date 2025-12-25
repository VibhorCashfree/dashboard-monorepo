// Reducers
import { batchDetailsReducer, initialState } from '../batchDetails';

describe('batchDetails reducers', () => {
  test('batchDetailsReducer()', () => {
    expect(batchDetailsReducer({}, { type: 'RESET' })).toStrictEqual(
      initialState,
    );

    expect(
      batchDetailsReducer(
        { currentPage: 10 },
        {
          type: 'SET_CURRENT_PAGE',
          payload: 'NEXT',
        },
      ),
    ).toStrictEqual({
      currentPage: 11,
    });

    expect(
      batchDetailsReducer(
        { currentPage: 10 },
        {
          type: 'SET_CURRENT_PAGE',
          payload: 'PREV',
        },
      ),
    ).toStrictEqual({
      currentPage: 9,
    });

    expect(
      batchDetailsReducer(
        { currentPage: 10 },
        {
          type: 'SET_DATE_VALUE',
          payload: '11/13/22',
        },
      ),
    ).toStrictEqual({
      dateValue: '11/13/22',
      currentPage: 1,
    });

    expect(
      batchDetailsReducer(
        { currentPage: 10 },
        {
          type: 'SET_FILTERS',
          payload: 'foo',
        },
      ),
    ).toStrictEqual({
      filters: 'foo',
      currentPage: 1,
    });

    expect(
      batchDetailsReducer(
        { currentPage: 10 },
        {
          type: 'SET_SEARCH_BY',
          payload: 'foo',
        },
      ),
    ).toStrictEqual({
      searchBy: 'foo',
      currentPage: 10,
    });

    expect(
      batchDetailsReducer(
        { currentPage: 10 },
        {
          type: 'SET_LIMIT',
          payload: '20',
        },
      ),
    ).toStrictEqual({
      limit: 20,
      currentPage: 1,
    });
  });
});
