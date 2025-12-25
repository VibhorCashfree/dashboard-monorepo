// Action Types
import { FETCH_DOWNTIMES } from 'redux/actionTypes/fetchDowntimes';

const downtimesReducer = (state = [], action: { type: any; payload: any }) => {
  switch (action.type) {
    case FETCH_DOWNTIMES:
      return action.payload;
    default:
      return state;
  }
};

export default downtimesReducer;
