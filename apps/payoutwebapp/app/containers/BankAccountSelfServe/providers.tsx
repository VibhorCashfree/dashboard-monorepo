import { useContext, createContext } from 'react';

// Types
import type { ContextType } from 'containers/PayoutAggregator/types';

export const BankAccountSelfServeContext = createContext<
  ContextType | undefined
>(undefined);

export const useBankAccountSelfServe = () => {
  const context = useContext(BankAccountSelfServeContext);

  if (context === undefined) {
    throw new Error(
      'useBankAccountSelfServe must be used within a BankAccountSelfServeProvider',
    );
  }

  return context;
};
