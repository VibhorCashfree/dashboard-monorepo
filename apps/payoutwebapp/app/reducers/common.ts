// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Constants
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { DEFAULT_VALUE } from 'constants/date';

// Types
import type { StateType } from './types';

export const DEFAULT_STATE: StateType = {
  dateValue: DEFAULT_VALUE,
  limit: DEFAULT_LIMIT,
  currentPage: DEFAULT_CURRENT_PAGE,
  filters: {},
};

export const commonReducer = (
  prevState: StateType,
  action: { type: COMMON_ACTION_TYPE; payload?: any },
) => {
  switch (action.type) {
    case COMMON_ACTION_TYPE.SET_CURRENT_PAGE:
      {
        const type = action.payload;

        switch (type) {
          case COMMON_ACTION_TYPE.NEXT:
            return {
              ...prevState,
              currentPage: prevState.currentPage + 1,
            };

          case COMMON_ACTION_TYPE.PREV:
            return {
              ...prevState,
              currentPage: prevState.currentPage - 1,
            };

          default:
            return prevState;
        }
      }
      break;

    case COMMON_ACTION_TYPE.SET_DATA:
      return {
        ...prevState,
        data: { ...prevState.data, ...action.payload },
      };

    case COMMON_ACTION_TYPE.SET_DATE_VALUE:
      return {
        ...prevState,
        dateValue: action.payload,
        currentPage: 1,
      };

    case COMMON_ACTION_TYPE.SET_FILTERS:
      return {
        ...prevState,
        filters: action.payload,
        currentPage: 1,
      };

    case COMMON_ACTION_TYPE.SET_SEARCH_BY:
      return {
        ...prevState,
        searchBy: action.payload,
      };

    case COMMON_ACTION_TYPE.SET_LIMIT:
      return {
        ...prevState,
        limit: parseInt(action.payload, 10),
        currentPage: 1,
      };

    default:
      return prevState;
  }
};
