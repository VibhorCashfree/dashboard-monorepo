import React, {
  createContext,
  useEffect,
  useReducer,
  useContext,
  Dispatch,
} from 'react';

// Action Types
import LIST_ACTION_TYPE from 'actionTypes/list';

// Utils
import Emitter from 'utils/emitter';

// Reducers
import { initialState, reducers } from './reducers';

type ContextType = {
  state: {
    selected2FA: string | undefined;
  };
  dispatch: Dispatch<
    | {
        type: 'RESET';
      }
    | {
        type: 'SET_DATA';
        payload: string;
      }
  >;
};

export const TwoFactorContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

TwoFactorContext.displayName = 'TwoFactorContext';

export const TwoFactorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducers, initialState);

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
    <TwoFactorContext.Provider value={{ state, dispatch }}>
      {children}
    </TwoFactorContext.Provider>
  );
};

export const useTwoFactor = () => {
  const context = useContext(TwoFactorContext);

  if (context === undefined) {
    throw new Error('useTwoFactor must be used within a TwoFactorProvider');
  }

  return context;
};
