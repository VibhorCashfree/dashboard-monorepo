import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';

// Components
import Loader from 'components/Loader';

// Utils
import http from 'utils/http';
import Token from 'utils/token';
import AccountId from 'utils/accountId';

// Constants
import { ACCOUNT_TYPES } from 'constants/common';

// Services
import {
  updateToken,
  getAccountInfo,
  getAccountConfig,
  getFreeCreditRates,
} from 'services/accounts';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const { accountList } = useContext(MerchantContext);

  const [contextData, setContextData] = useState();
  const [account, setAccount] = useState();
  const [accountId, setAccountId] = useState(() => AccountId.get());
  const [loading, setLoading] = useState(false);
  const [openSwitch, setOpenSwitch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!accountId) {
      setAccount(accountList[0]);
    }
  }, []);

  useEffect(() => {
    if (!accountId) {
      return;
    }

    (async function fetchData() {
      setLoading(true);

      const [accountInfo, preferences, freeCreditRates] = await Promise.all([
        getAccountInfo(),
        getAccountConfig(),
        getFreeCreditRates(),
      ]);

      setContextData({
        accountInfo,
        preferences,
        freeCreditRates,
        fundSourceDetails: preferences?.fundSourceDetails,
      });

      setLoading(false);
    })();
  }, [accountId]);

  useEffect(() => {
    (async function updateAccount() {
      if (!account) {
        return;
      }

      const repsonse = await updateToken(account.accountId);
      const token = _get(repsonse, 'data.token');

      // update in localstorage
      Token.set(token);
      AccountId.set(account.accountId);

      // update in axios instance
      http.defaults.headers.Authorization = `Bearer ${token}`;

      setAccountId(account.accountId);
    })();
  }, [account]);

  const noAccounts = accountList && accountList.length === 0;

  if (!noAccounts && !contextData) {
    return null;
  }

  return (
    <AccountContext.Provider
      value={{
        ...contextData,
        openSwitch,
        setOpenSwitch,
        handleAccountSelect: (account, options = { navigate: true }) => {
          setAccount(account);
          setOpenSwitch(false);

          if (options.navigate) {
            navigate('/home');
          }
        },
      }}
    >
      {loading ? <Loader /> : children}
    </AccountContext.Provider>
  );
};

AccountProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
