import React, {
  createContext,
  useEffect,
  useContext,
  useReducer,
  Dispatch,
} from 'react';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';
import LIST_ACTION_TYPE from 'actionTypes/list';

// Utils
import Emitter from 'utils/emitter';

// Reducers
import { initialState, listReducer } from '../reducers/list';

// Types
import type { StateType } from 'reducers/types';

type ContextType = {
  state: StateType;
  dispatch: Dispatch<
    | {
        type: LIST_ACTION_TYPE;
        payload?: any;
      }
    | {
        type: COMMON_ACTION_TYPE;
        payload?: any;
      }
  >;
};

export const ListContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

ListContext.displayName = 'ListContext';

export const ListProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  useEffect(() => {
    Emitter.on('MENU_CHANGE', function () {
      dispatch({
        type: LIST_ACTION_TYPE.RESET,
      });
    });

    return () => {
      Emitter.off('MENU_CHANGE');
    };
  }, []);

  return (
    <ListContext.Provider value={{ state, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => {
  const context = useContext(ListContext);

  if (context === undefined) {
    throw new Error('useList must be used within a ListProvider');
  }

  return context;
};
