// Action Types
import { FETCH_AVAILABLE_BALANCE } from 'redux/actions/fetchAvailableBalance';
import { WITHDRAW_BALANCE } from 'redux/actions/withdrawBalance';

// Reducers
import availableBalanceReducer from '../availableBalance';

describe('availableBalance reducers', () => {
  test('availableBalanceReducer()', () => {
    expect(
      availableBalanceReducer(
        {},
        { type: FETCH_AVAILABLE_BALANCE, payload: 100 },
      ),
    ).toStrictEqual(100);

    expect(
      availableBalanceReducer(
        { availableBalance: 100, balance: 70 },
        { type: WITHDRAW_BALANCE, payload: 100 },
      ),
    ).toStrictEqual({ availableBalance: 0, balance: -30 });

    expect(
      availableBalanceReducer(
        { availableBalance: 100, balance: 70 },
        { type: 'SOMETHING_ELSE' },
      ),
    ).toStrictEqual({ availableBalance: 100, balance: 70 });

    expect(
      availableBalanceReducer(
        { availableBalance: 100, balance: 70 },
        { type: '@@INIT' },
      ),
    ).toStrictEqual({ availableBalance: 100, balance: 70 });

    expect(
      availableBalanceReducer(
        { availableBalance: 100, balance: 70 },
        { type: 'SOMETHING_ELSE' },
      ),
    ).toStrictEqual({ availableBalance: 100, balance: 70 });
  });
});
