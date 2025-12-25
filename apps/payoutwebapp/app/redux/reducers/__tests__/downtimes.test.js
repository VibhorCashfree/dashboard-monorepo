// Action Types
import { FETCH_DOWNTIMES } from 'redux/actionTypes/fetchDowntimes';

// Reducers
import downtimesReducer from '../downtimes';

describe('downtimesReducer', () => {
  test('should return the initial state when state is undefined', () => {
    const initialState = [];
    const action = {};
    const newState = downtimesReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('should return the initial state when action type does not match', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = downtimesReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  test('should handle FETCH_DOWNTIMES action', () => {
    const initialState = [];
    const downtimes = [
      { id: 1, startTime: '2023-01-01', endTime: '2023-01-02' },
    ];
    const action = { type: FETCH_DOWNTIMES, payload: downtimes };
    const newState = downtimesReducer(initialState, action);
    expect(newState).toEqual(downtimes);
  });
});
