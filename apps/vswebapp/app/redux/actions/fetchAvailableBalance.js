// Services
import { getAvailableBalance } from 'services/accounts';

export const FETCH_AVAILABLE_BALANCE = 'FETCH_AVAILABLE_BALANCE';

const fetchAvailableBalance = paymentInstrumentID =>
  async function thunk(dispatch) {
    const payload = await getAvailableBalance(paymentInstrumentID);

    if (!payload.error) {
      dispatch({
        type: FETCH_AVAILABLE_BALANCE,
        payload,
      });
    }
  };

export default fetchAvailableBalance;
