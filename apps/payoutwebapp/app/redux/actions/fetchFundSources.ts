// Constants
import { FETCH_FUNDSOURCES } from 'redux/actionTypes/fetchFundSources';

// Services
import { getAll } from 'services/fundSources';

const fetchFundSources = () =>
  async function thunk(
    dispatch: (arg0: { type: string; payload: any }) => void,
  ) {
    const response = await getAll();

    dispatch({
      type: FETCH_FUNDSOURCES,
      payload: 'error' in response ? [] : response,
    });
  };

export default fetchFundSources;
