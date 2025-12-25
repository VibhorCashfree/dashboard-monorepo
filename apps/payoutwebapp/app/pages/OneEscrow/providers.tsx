import React, { createContext, useState, useEffect, useContext } from 'react';

// Services
import { getVirtualAccounts } from 'services/fundSources';

// Utils
import FundSourcesUtil from 'utils/fundSources';

type ContextType = {
  details: AnyObject;
  virtualAccounts: AnyObject[];
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const EscrowAccountContext = createContext<ContextType | undefined>(
  undefined,
);

export const EscrowAccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contextData, setContextData] = useState<
    ContextType['virtualAccounts'] | undefined
  >(undefined);
  const [fetchCounter, setFetchCounter] = useState(0);

  useEffect(() => {
    (async function fetchData() {
      const response = await getVirtualAccounts();
      setContextData('error' in response ? [] : response);
    })();
  }, [fetchCounter]);

  if (!contextData) {
    return null;
  }

  const details = FundSourcesUtil.getOneEscrow(contextData);
  const virtualAccounts = FundSourcesUtil.getVirtualAccounts(contextData);

  return (
    <EscrowAccountContext.Provider
      value={{
        details: details as AnyObject,
        virtualAccounts,
        setFetchCounter,
      }}
    >
      {children}
    </EscrowAccountContext.Provider>
  );
};

export const useEscrowAccount = () => {
  const context = useContext(EscrowAccountContext);

  if (context === undefined) {
    throw new Error(
      'useEscrowAccount must be used within a EscrowAccountProvider',
    );
  }

  return context;
};
