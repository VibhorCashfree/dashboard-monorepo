// Action Types
import { FETCH_FREE_CREDITS } from 'redux/actions/fetchFreeCredits';

// Reducers
import freeCreditsReducer from '../freeCredits';

describe('freeCredits reducers', () => {
  test('freeCreditsReducer()', () => {
    expect(
      freeCreditsReducer(
        {},
        {
          type: FETCH_FREE_CREDITS,
          payload: {
            amount: '1.13',
            valid: true,
          },
        },
      ),
    ).toStrictEqual({
      amount: '1.13',
      valid: true,
    });

    expect(
      freeCreditsReducer(
        {
          amount: '1.13',
          valid: true,
        },
        {
          type: FETCH_FREE_CREDITS,
          payload: {
            amount: '1.13',
            valid: false,
          },
        },
      ),
    ).toStrictEqual({
      amount: '1.13',
      valid: false,
    });

    expect(
      freeCreditsReducer(
        {
          amount: '1.13',
          valid: true,
        },
        { type: '@@INIT', payload: { amount: '2' } },
      ),
    ).toStrictEqual({
      amount: '1.13',
      valid: true,
    });
  });
});
