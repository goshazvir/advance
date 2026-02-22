'use client';
import React, {createContext, useState} from 'react';

type InsuredDashboardContextType = {
  selectedInsuredId: string | null | undefined;
  setSelectedInsuredId: (id: string | null | undefined) => void;
};

export const InsuredDashboardContext = createContext<
  InsuredDashboardContextType | undefined
>(undefined);

export const InsuredDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [selectedInsuredId, setSelectedInsuredId] = useState<
    string | null | undefined
  >(null);

  return (
    <InsuredDashboardContext.Provider
      value={{selectedInsuredId, setSelectedInsuredId}}
    >
      {children}
    </InsuredDashboardContext.Provider>
  );
};
