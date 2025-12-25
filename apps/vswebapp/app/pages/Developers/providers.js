import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Reducers
import { initialState, reducers } from './reducers';

export const TwoFactorContext = createContext();

export const TwoFactorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <TwoFactorContext.Provider value={{ state, dispatch }}>
      {children}
    </TwoFactorContext.Provider>
  );
};

TwoFactorProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
