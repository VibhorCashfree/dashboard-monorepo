import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Reducers
import { initialState, batchDetailsReducer } from '../reducers/batchDetails';

export const BatchDetailsContext = createContext();

export const BatchDetailsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(batchDetailsReducer, initialState);

  return (
    <BatchDetailsContext.Provider value={{ state, dispatch }}>
      {children}
    </BatchDetailsContext.Provider>
  );
};

BatchDetailsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
