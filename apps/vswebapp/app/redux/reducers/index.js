/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

// Reducers
import availableBalanceReducer from './availableBalance';
import lowBalanceThresholdReducer from './lowBalanceThreshold';
import freeCreditsReducer from './freeCredits';
import favouriteProductsReducer from './favouriteProducts';
import rechargeAccountsReducer from './rechargeAccounts';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
const createReducer = () => {
  const rootReducer = combineReducers({
    availableBalance: availableBalanceReducer,
    lowBalanceThreshold: lowBalanceThresholdReducer,
    freeCredits: freeCreditsReducer,
    favouriteProducts: favouriteProductsReducer,
    rechargeAccounts: rechargeAccountsReducer,
  });

  return rootReducer;
};

export default createReducer;
