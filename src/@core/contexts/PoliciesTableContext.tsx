'use client';
import React, {createContext, useState} from 'react';

type PoliciesTableContextType = {
  selectedPolicyId: string | null;
  setSelectedPolicyId: (id: string | null) => void;
};

export const PoliciesTableContext = createContext<
  PoliciesTableContextType | undefined
>(undefined);

export const PoliciesTableProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);

  return (
    <PoliciesTableContext.Provider
      value={{selectedPolicyId, setSelectedPolicyId}}
    >
      {children}
    </PoliciesTableContext.Provider>
  );
};
