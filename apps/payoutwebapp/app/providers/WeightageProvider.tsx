import React, { createContext, useState, useEffect, useContext } from 'react';

// Services
import { getWeightage } from 'services/fundSources';

type ContextType = {
  weightage: {
    id: number;
    name: string;
    weightage: string;
  }[];
  setWeightage: React.Dispatch<
    React.SetStateAction<ContextType['weightage'] | undefined>
  >;
};

export const WeightageContext = createContext<ContextType | undefined>(
  undefined,
);

WeightageContext.displayName = 'WeightageContext';

export const WeightageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contextData, setContextData] = useState<
    ContextType['weightage'] | undefined
  >(undefined);

  useEffect(() => {
    (async function fetchData() {
      const response = await getWeightage({ source: 'DASHBOARD' });
      setContextData('error' in response ? [] : response);
    })();
  }, []);

  if (!contextData) {
    return null;
  }

  return (
    <WeightageContext.Provider
      value={{ weightage: contextData, setWeightage: setContextData }}
    >
      {children}
    </WeightageContext.Provider>
  );
};

export const useWeightage = () => {
  const context = useContext(WeightageContext);

  if (context === undefined) {
    throw new Error('useWeightage must be used within a WeightageProvider');
  }

  return context;
};
