// Action Types
import { FETCH_FUNDSOURCES } from 'redux/actionTypes/fetchFundSources';

const fundSourcesReducer = (
  state = [],
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case FETCH_FUNDSOURCES:
      return action.payload;
    default:
      return state;
  }
};

export default fundSourcesReducer;
