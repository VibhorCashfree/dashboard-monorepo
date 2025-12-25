// Constants
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { DEFAULT_VALUE } from 'constants/date';

export const initialState = {
  dateValue: DEFAULT_VALUE,
  limit: DEFAULT_LIMIT,
  currentPage: DEFAULT_CURRENT_PAGE,
  filters: {},
};

export const listReducer = (prevState, action) => {
  if (action.type === 'RESET') {
    return { ...initialState, key: action.key };
  }

  if (typeof prevState.key !== 'undefined' && action.key !== prevState.key) {
    return prevState;
  }

  switch (action.type) {
    case 'QUERY_FILTERS':
      return {
        ...prevState,
        filters: action.payload.statuses,
        dateValue: {
          displayText: 'Custom',
          range: action.payload.range.map(date => new Date(date)),
        },
      };

    case 'SET_CURRENT_PAGE':
      {
        const type = action.payload;

        switch (type) {
          case 'NEXT':
            return {
              ...prevState,
              currentPage: prevState.currentPage + 1,
            };

          case 'PREV':
            return {
              ...prevState,
              currentPage: prevState.currentPage - 1,
            };
        }
      }
      break;

    case 'SET_DATA':
      return {
        ...prevState,
        data: { ...prevState.data, ...action.payload },
      };

    case 'SET_DATE_VALUE':
      return {
        ...prevState,
        dateValue: action.payload,
        currentPage: 1,
      };

    case 'SET_FILTERS':
      return {
        ...prevState,
        filters: action.payload,
        currentPage: 1,
      };

    case 'SET_SEARCH_BY':
      return {
        ...prevState,
        searchBy: action.payload,
      };

    case 'SET_LIMIT':
      return {
        ...prevState,
        limit: parseInt(action.payload, 10),
        currentPage: 1,
      };
  }
};
