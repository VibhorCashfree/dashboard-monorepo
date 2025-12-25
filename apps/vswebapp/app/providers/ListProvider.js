import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Reducers
import { initialState, listReducer } from '../reducers/list';

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  return (
    <ListContext.Provider value={{ state, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};

ListProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
