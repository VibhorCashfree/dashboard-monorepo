// Action types
import { FETCH_FREE_CREDITS } from 'redux/actions/fetchFreeCredits';

const freeCreditsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FREE_CREDITS:
      return action.payload;
    default:
      return state;
  }
};

export default freeCreditsReducer;
