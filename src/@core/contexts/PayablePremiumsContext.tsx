'use client';
import React, {createContext, useState} from 'react';

type PayablePremiumsContextType = {
  selectedPayablePremiumId: string | null;
  setSelectedPayablePremiumId: (id: string | null) => void;
};

export const PayablePremiumsContext = createContext<
  PayablePremiumsContextType | undefined
>(undefined);

export const PayablePremiumsProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [selectedPayablePremiumId, setSelectedPayablePremiumId] = useState<
    string | null
  >(null);

  return (
    <PayablePremiumsContext.Provider
      value={{selectedPayablePremiumId, setSelectedPayablePremiumId}}
    >
      {children}
    </PayablePremiumsContext.Provider>
  );
};
