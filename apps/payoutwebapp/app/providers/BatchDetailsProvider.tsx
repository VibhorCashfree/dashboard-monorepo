import React, { createContext, useContext, useReducer, Dispatch } from 'react';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';
import BATCH_DETAILS_ACTION_TYPE from 'actionTypes/batchDetails';

// Reducers
import { initialState, batchDetailsReducer } from '../reducers/batchDetails';

// Types
import type { StateType } from 'reducers/types';

type ContextType = {
  state: StateType;
  dispatch: Dispatch<
    | {
        type: BATCH_DETAILS_ACTION_TYPE;
        payload?: any;
      }
    | {
        type: COMMON_ACTION_TYPE;
        payload?: any;
      }
  >;
};

export const BatchDetailsContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

BatchDetailsContext.displayName = 'BatchDetailsContext';

export const BatchDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(batchDetailsReducer, initialState);

  return (
    <BatchDetailsContext.Provider value={{ state, dispatch }}>
      {children}
    </BatchDetailsContext.Provider>
  );
};

export const useBatchDetails = () => {
  const context = useContext(BatchDetailsContext);

  if (context === undefined) {
    throw new Error(
      'useBatchDetails must be used within a BatchDetailsProvider',
    );
  }

  return context;
};
