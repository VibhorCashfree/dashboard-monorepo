import React, { createContext, useState, useEffect, useContext } from 'react';
import { Loader } from '@cashfree-intl/coherent';
import { Dictionary } from 'lodash';

// Constants
import { USER_TYPE, REGION } from 'constants/common';

// Services
import {
  getMerchantSettings,
  getAccountList,
  getActivationDetails,
  getMerchantRestrictions,
} from 'services/accounts';
import { getFeatureToggle } from 'services/misc';

// Utils
import Region from 'utils/region';

type ContextType = {
  merchantSettings: {
    enableConnectedWallet?: boolean;
    enableMerchantAPIKeyAddition?: boolean;
  };
  featureFlags: Dictionary<any>;
  accountList: Account[];
  merchantDetails: {
    accountAlias: string;
    aliasEmail: string;
    role: string;
    userId: number;
    accountId: number;
    merchantId: number;
    name: string;
    userType: USER_TYPE;
    authType: string;
    email: string;
    cfProductStatus: {
      CSP: string;
    };
  };
  restrictionCodes: number[];
};

export const MerchantContext = createContext<ContextType | undefined>(
  undefined,
);

MerchantContext.displayName = 'MerchantContext';

export const MerchantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contextData, setContextData] = useState<ContextType | undefined>(
    undefined,
  );

  const region = Region.get();

  useEffect(() => {
    (async function fetchData() {
      const [merchantSettings, accountList, accountDetails]: any[] =
        await Promise.all([
          getMerchantSettings(),
          getAccountList(),
          getActivationDetails(),
        ]);

      const restrictionCodes =
        region === REGION.IN ? await getMerchantRestrictions() : [];

      const featureFlags = region === REGION.IN ? await getFeatureToggle() : [];

      // @TODO: tmp hack
      accountDetails.data.cfProductStatus =
        accountDetails.data.cfProductStatus || {};

      setContextData({
        merchantSettings: 'error' in merchantSettings ? {} : merchantSettings,
        featureFlags,
        accountList,
        merchantDetails: accountDetails.data,
        restrictionCodes: restrictionCodes as number[],
      });
    })();
  }, []);

  if (!contextData) {
    return <Loader active />;
  }

  return (
    <MerchantContext.Provider value={contextData}>
      {children}
    </MerchantContext.Provider>
  );
};

export const useMerchant = () => {
  const context = useContext(MerchantContext);

  if (context === undefined) {
    throw new Error('useMerchant must be used within a MerchantProvider');
  }

  return context;
};
