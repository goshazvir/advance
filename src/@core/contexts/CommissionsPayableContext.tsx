'use client';
import React, {createContext, useState} from 'react';

type CommissionsPayableContextType = {
  selectedCommissionPayableId: string | null | undefined;
  setSelectedCommissionPayableId: (id: string | null | undefined) => void;
};

export const CommissionsPayableContext = createContext<
  CommissionsPayableContextType | undefined
>(undefined);

export const CommissionsPayableProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [selectedCommissionPayableId, setSelectedCommissionPayableId] =
    useState<string | null | undefined>(undefined);

  return (
    <CommissionsPayableContext.Provider
      value={{selectedCommissionPayableId, setSelectedCommissionPayableId}}
    >
      {children}
    </CommissionsPayableContext.Provider>
  );
};
