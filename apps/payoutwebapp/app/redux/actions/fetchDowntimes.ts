// Constants
import { FETCH_DOWNTIMES } from 'redux/actionTypes/fetchDowntimes';

// Services
import { getDowntimes } from 'services/fundSources';

const fetchDowntimes = (queryObj = {}) =>
  async function thunk(
    dispatch: (arg0: { type: string; payload: any }) => void,
  ) {
    const response = await getDowntimes(queryObj);

    dispatch({
      type: FETCH_DOWNTIMES,
      payload: 'error' in response ? [] : response,
    });
  };

export default fetchDowntimes;
