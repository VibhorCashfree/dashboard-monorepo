// Action Types
import { FETCH_LOW_BALANCE_THRESHOLD } from 'redux/actions/fetchLowBalanceThreshold';

// Reducers
import lowBalanceThresholdReducer from '../lowBalanceThreshold';

describe('lowBalanceThreshold reducers', () => {
  test('lowBalanceThresholdReducer()', () => {
    expect(
      lowBalanceThresholdReducer(
        {},
        { type: FETCH_LOW_BALANCE_THRESHOLD, payload: 100 },
      ),
    ).toStrictEqual(100);

    expect(
      lowBalanceThresholdReducer({ foo: 'bar' }, { type: '@@INIT' }),
    ).toStrictEqual({ foo: 'bar' });

    expect(
      lowBalanceThresholdReducer({ foo: 'bar' }, { type: 'SOMETHING_ELSE' }),
    ).toStrictEqual({ foo: 'bar' });
  });
});
