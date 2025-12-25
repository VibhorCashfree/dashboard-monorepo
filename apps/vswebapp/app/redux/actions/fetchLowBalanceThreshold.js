// Services
import { getLowBalanceThreshold } from 'services/accounts';

export const FETCH_LOW_BALANCE_THRESHOLD = 'FETCH_LOW_BALANCE_THRESHOLD';

const fetchLowBalanceThreshold = () =>
  async function thunk(dispatch) {
    const payload = await getLowBalanceThreshold();

    dispatch({
      type: FETCH_LOW_BALANCE_THRESHOLD,
      payload,
    });
  };

export default fetchLowBalanceThreshold;
