// Action Types
import { FETCH_FUNDSOURCES } from 'redux/actionTypes/fetchFundSources';

// Reducers
import fundSourcesReducer from '../fundSources';

describe('fundSourcesReducer', () => {
  test('should return the initial state when state is undefined', () => {
    const initialState = [];
    const action = {};
    const newState = fundSourcesReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('should return the initial state when action type does not match', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = fundSourcesReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  test('should handle FETCH_FUNDSOURCES action', () => {
    const initialState = [];
    const fundSources = [
      { id: 1, name: 'Source A' },
      { id: 2, name: 'Source B' },
    ];
    const action = { type: FETCH_FUNDSOURCES, payload: fundSources };
    const newState = fundSourcesReducer(initialState, action);
    expect(newState).toEqual(fundSources);
  });
});
