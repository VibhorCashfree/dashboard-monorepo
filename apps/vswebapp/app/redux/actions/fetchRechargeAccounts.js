// Services
import { getRechargeBankAccounts } from 'services/accounts';

export const FETCH_RECHARGE_ACCOUNTS = 'FETCH_RECHARGE_ACCOUNTS';

const fetchRechargeAccounts = id =>
  async function thunk(dispatch) {
    const payload = await getRechargeBankAccounts(id);

    if (!payload.error) {
      dispatch({
        type: FETCH_RECHARGE_ACCOUNTS,
        payload,
      });
    }
  };

export default fetchRechargeAccounts;
