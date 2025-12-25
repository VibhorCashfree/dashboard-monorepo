import { combineReducers } from 'redux';

// Constants
import { ACCOUNT_SWITCH } from 'redux/actionTypes/accountSwitch';

// Reducers
import fundSourcesReducer from './fundSources';
import downtimesReducer from './downtimes';

const createReducer = () => {
  const appReducer = combineReducers({
    fundSources: fundSourcesReducer,
    downtimes: downtimesReducer,
  });

  const rootReducer = (state: any, action: { type: any; payload: any }) => {
    if (action.type === ACCOUNT_SWITCH) {
      return appReducer(undefined, action);
    }

    return appReducer(state, action);
  };

  return rootReducer;
};

export default createReducer;
