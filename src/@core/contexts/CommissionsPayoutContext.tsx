'use client';
import React, {createContext, useState} from 'react';

type CommissionsPayoutContextType = {
  selectedCommissionPayoutId: string | null;
  setSelectedCommissionPayoutId: (id: string | null) => void;
};

export const CommissionsPayoutContext = createContext<
  CommissionsPayoutContextType | undefined
>(undefined);

export const CommissionsPayoutProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [selectedCommissionPayoutId, setSelectedCommissionPayoutId] = useState<
    string | null
  >(null);

  return (
    <CommissionsPayoutContext.Provider
      value={{selectedCommissionPayoutId, setSelectedCommissionPayoutId}}
    >
      {children}
    </CommissionsPayoutContext.Provider>
  );
};
