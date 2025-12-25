// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';
import BATCH_DETAILS_ACTION_TYPE from 'actionTypes/batchDetails';

// Reducers
import { DEFAULT_STATE, commonReducer } from './common';

// Types
import type { StateType } from './types';

export const initialState = DEFAULT_STATE;

export const batchDetailsReducer = (
  prevState: StateType,
  action:
    | {
        type: BATCH_DETAILS_ACTION_TYPE;
        payload?: any;
      }
    | {
        type: COMMON_ACTION_TYPE;
        payload?: any;
      },
) => {
  switch (action.type) {
    case BATCH_DETAILS_ACTION_TYPE.RESET:
      return initialState;

    default:
      return commonReducer(prevState, action);
  }
};
