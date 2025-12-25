// Action types
import { FETCH_RECHARGE_ACCOUNTS } from 'redux/actions/fetchRechargeAccounts';

const rechargeAccountsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_RECHARGE_ACCOUNTS:
      return action.payload;
    default:
      return state;
  }
};

export default rechargeAccountsReducer;
