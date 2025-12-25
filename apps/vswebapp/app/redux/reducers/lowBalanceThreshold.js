// Action types
import { FETCH_LOW_BALANCE_THRESHOLD } from 'redux/actions/fetchLowBalanceThreshold';

const lowBalanceThresholdReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LOW_BALANCE_THRESHOLD:
      return action.payload;
    default:
      return state;
  }
};

export default lowBalanceThresholdReducer;
