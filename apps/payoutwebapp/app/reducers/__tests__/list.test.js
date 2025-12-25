// Action Types
import LIST_ACTION_TYPE from 'actionTypes/list';
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Reducers
import { listReducer, initialState } from '../list';

describe('list reducers', () => {
  test('listReducer()', () => {
    expect(listReducer({}, { type: LIST_ACTION_TYPE.RESET })).toMatchObject({
      ...initialState,
      // key: Date.now(),
    });

    expect(
      listReducer({ foo: 'bar', key: 'doo' }, { key: 'foo' }),
    ).toStrictEqual({ foo: 'bar', key: 'doo' });

    expect(
      listReducer(
        {},
        {
          type: LIST_ACTION_TYPE.QUERY_FILTERS,
          payload: {
            statuses: [1, 2],
            range: ['11/12/22', '11/12/23', '11/12/24'],
          },
        },
      ),
    ).toStrictEqual({
      filters: [1, 2],
      dateValue: {
        displayText: 'Custom',
        range: [
          new Date('11/12/22'),
          new Date('11/12/23'),
          new Date('11/12/24'),
        ],
      },
    });

    expect(
      listReducer(
        { currentPage: 10 },
        {
          type: COMMON_ACTION_TYPE.SET_CURRENT_PAGE,
          payload: 'NEXT',
        },
      ),
    ).toStrictEqual({
      currentPage: 11,
    });

    expect(
      listReducer(
        { currentPage: 10 },
        {
          type: COMMON_ACTION_TYPE.SET_CURRENT_PAGE,
          payload: 'PREV',
        },
      ),
    ).toStrictEqual({
      currentPage: 9,
    });

    expect(
      listReducer(
        { currentPage: 10 },
        {
          type: COMMON_ACTION_TYPE.SET_DATE_VALUE,
          payload: '11/13/22',
        },
      ),
    ).toStrictEqual({
      dateValue: '11/13/22',
      currentPage: 1,
    });

    expect(
      listReducer(
        { currentPage: 10 },
        {
          type: COMMON_ACTION_TYPE.SET_FILTERS,
          payload: 'foo',
        },
      ),
    ).toStrictEqual({
      filters: 'foo',
      currentPage: 1,
    });

    expect(
      listReducer(
        { currentPage: 10 },
        {
          type: COMMON_ACTION_TYPE.SET_SEARCH_BY,
          payload: 'foo',
        },
      ),
    ).toStrictEqual({
      searchBy: 'foo',
      currentPage: 10,
    });

    expect(
      listReducer(
        { currentPage: 10 },
        {
          type: COMMON_ACTION_TYPE.SET_LIMIT,
          payload: '20',
        },
      ),
    ).toStrictEqual({
      limit: 20,
      currentPage: 1,
    });
  });
});
