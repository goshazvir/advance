'use client';
import React, {createContext, useState} from 'react';

type PlansDashboardContextType = {
  selectedPlanId: string | null;
  setSelectedPlanId: (id: string | null) => void;
};

export const PlansDashboardContext = createContext<
  PlansDashboardContextType | undefined
>(undefined);

export const PlansDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  return (
    <PlansDashboardContext.Provider
      value={{
        selectedPlanId,
        setSelectedPlanId,
      }}
    >
      {children}
    </PlansDashboardContext.Provider>
  );
};
