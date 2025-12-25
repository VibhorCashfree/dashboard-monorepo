// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';
import LIST_ACTION_TYPE from 'actionTypes/list';

// Reducers
import { commonReducer, DEFAULT_STATE } from './common';

// Types
import type { StateType } from './types';

export const initialState = DEFAULT_STATE;

export const listReducer = (
  prevState: StateType,
  action:
    | {
        type: LIST_ACTION_TYPE;
        payload?: any;
      }
    | {
        type: COMMON_ACTION_TYPE;
        payload?: any;
      },
) => {
  switch (action.type) {
    case LIST_ACTION_TYPE.RESET:
      return { ...initialState, key: Date.now() };

    case LIST_ACTION_TYPE.QUERY_FILTERS:
      return {
        ...prevState,
        filters: action.payload.statuses,
        dateValue: {
          displayText: 'Custom',
          range: action.payload.range.map((date: Date) => new Date(date)),
        },
      };

    default:
      return commonReducer(prevState, action);
  }
};
