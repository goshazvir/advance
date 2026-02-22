'use client';
import React, {createContext, useState} from 'react';

type PaidOutContextType = {
  selectedPaidOutId: string | null | undefined;
  setSelectedPaidOutId: (id: string | null | undefined) => void;
};

export const PaidOutContext = createContext<PaidOutContextType | undefined>(
  undefined,
);

export const PaidOutProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [selectedPaidOutId, setSelectedPaidOutId] = useState<
    string | null | undefined
  >(null);

  return (
    <PaidOutContext.Provider value={{selectedPaidOutId, setSelectedPaidOutId}}>
      {children}
    </PaidOutContext.Provider>
  );
};
