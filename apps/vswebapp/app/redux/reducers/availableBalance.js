// Action types
import { FETCH_AVAILABLE_BALANCE } from 'redux/actions/fetchAvailableBalance';
import { WITHDRAW_BALANCE } from 'redux/actions/withdrawBalance';

const availableBalanceReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_AVAILABLE_BALANCE:
      return action.payload;

    case WITHDRAW_BALANCE: {
      const availableBalance =
        Number(state.availableBalance) - Number(action.payload);

      const balance = Number(state.balance) - Number(action.payload);

      return {
        ...state,
        availableBalance,
        balance,
      };
    }

    default:
      return state;
  }
};

export default availableBalanceReducer;
