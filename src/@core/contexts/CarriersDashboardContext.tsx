'use client';
import React, {createContext, useState} from 'react';

type CarriersDashboardContextType = {
  selectedCarrierId: string | null;
  setSelectedCarrierId: (id: string | null) => void;
};

export const CarriersDashboardContext = createContext<
  CarriersDashboardContextType | undefined
>(undefined);

export const CarriersDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [selectedCarrierId, setSelectedCarrierId] = useState<string | null>(
    null,
  );

  return (
    <CarriersDashboardContext.Provider
      value={{selectedCarrierId, setSelectedCarrierId}}
    >
      {children}
    </CarriersDashboardContext.Provider>
  );
};
