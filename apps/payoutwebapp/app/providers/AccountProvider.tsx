import React, { createContext, useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Providers
import { useMerchant } from 'providers/MerchantProvider';

// Actions
import accountSwitchAction from 'redux/actions/accountSwitch';

// Constants
import { MENU, PATH_BY_MENU } from 'constants/menuItems';

// Utils
import http from 'utils/http';
import Token from 'utils/token';
import AccountId from 'utils/accountId';

// Services
import {
  updateToken,
  getAccountInfo,
  getAccountConfig,
} from 'services/accounts';
import { getYesBusinessType } from 'services/fundSources';

type ContextType = {
  accountInfo: AccountInfo;
  preferences: any;
  accountConfig: any;
  slabCharges: AccountSlabCharge[];
  yesBusinessType: {
    businessType: string;
    connectAllowed: boolean;
  };
  openSwitch: boolean;
  setOpenSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccountSelect: (account: Account) => void;
};

export const AccountContext = createContext<ContextType | undefined>(undefined);

AccountContext.displayName = 'AccountContext';

const AccProvider = ({
  accountSwitch,
  children,
}: {
  accountSwitch: () => void;
  children: React.ReactNode;
}) => {
  const { accountList } = useMerchant();

  const [contextData, setContextData] = useState<
    | Omit<ContextType, 'openSwitch' | 'setOpenSwitch' | 'handleAccountSelect'>
    | undefined
  >(undefined);

  const [accountId, setAccountId] = useState(AccountId.get());
  const [openSwitch, setOpenSwitch] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!accountId) {
      if (accountList.length > 0) {
        setAccountId(String(_get(accountList, [0, 'accountId'])));
      }

      if (accountList.length > 1) {
        setOpenSwitch(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!accountId) {
      return;
    }

    (async function fetchData() {
      setLoading(true);

      const repsonse = await updateToken(accountId);
      const token = _get(repsonse, 'data.token', '');

      // update in localstorage
      Token.set(token);
      AccountId.set(accountId);

      // redirect to global payouts
      // if (account.accountType === ACCOUNT_TYPE.GLOBAL_PAYOUTS) {
      //   window.location.href = process.env.GLOBAL_PAYOUTS_URL;
      // }

      // update in axios instance
      http.defaults.headers.Authorization = `Bearer ${token}`;

      const [accountInfo, accountConfigResponse, yesBusinessType]: any[] =
        await Promise.all([
          getAccountInfo(),
          getAccountConfig(),
          getYesBusinessType(),
        ]);

      setContextData({
        accountInfo,
        preferences: accountConfigResponse.preferences,
        accountConfig: accountConfigResponse.accountConfig,
        slabCharges: accountConfigResponse.slabCharges,
        yesBusinessType,
      });

      setLoading(false);
    })();
  }, [accountId]);

  const noAccounts = accountList && accountList.length === 0;

  if (!noAccounts && !contextData) {
    return <Loader active />;
  }

  return (
    <AccountContext.Provider
      value={{
        ...contextData!,
        openSwitch,
        setOpenSwitch,
        handleAccountSelect: (account: Account) => {
          setAccountId(String(account.accountId));
          setOpenSwitch(false);

          // clear redux store during account switch
          accountSwitch();

          navigate(`/${PATH_BY_MENU[MENU.SUMMARY]}`);
        },
      }}
    >
      {loading ? <Loader active /> : children}
    </AccountContext.Provider>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  accountSwitch: () => dispatch(accountSwitchAction()),
});

const withConnect = connect(null, mapDispatchToProps);

export const AccountProvider = withConnect(AccProvider);

export const useAccount = () => {
  const context = useContext(AccountContext);

  if (context === undefined) {
    throw new Error('useAccount must be used within a AccountProvider');
  }

  return context;
};
