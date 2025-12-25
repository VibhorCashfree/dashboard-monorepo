import { useContext, createContext } from 'react';

// Types
import type { ContextType } from './types';

export const PayoutAggregatorContext = createContext<ContextType | undefined>(
  undefined,
);

export const usePayoutAggregator = () => {
  const context = useContext(PayoutAggregatorContext);

  if (context === undefined) {
    throw new Error(
      'usePayoutAggregator must be used within a PayoutAggregatorProvider',
    );
  }

  return context;
};
