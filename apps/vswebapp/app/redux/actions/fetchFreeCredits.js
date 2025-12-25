// Services
import { getFreeTrial } from 'services/accounts';

export const FETCH_FREE_CREDITS = 'FETCH_FREE_CREDITS';

const fetchFreeCredits = () =>
  async function thunk(dispatch) {
    const payload = await getFreeTrial();

    dispatch({
      type: FETCH_FREE_CREDITS,
      payload,
    });
  };

export default fetchFreeCredits;
