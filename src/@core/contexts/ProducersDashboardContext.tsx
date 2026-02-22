'use client';
import React, {createContext, useState} from 'react';

type ProducersDashboardContextType = {
  selectedProducerId: string | null;
  setSelectedProducerId: (id: string | null) => void;
};

export const ProducersDashboardContext = createContext<
  ProducersDashboardContextType | undefined
>(undefined);

export const ProducersDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [selectedProducerId, setSelectedProducerId] = useState<string | null>(
    null,
  );

  return (
    <ProducersDashboardContext.Provider
      value={{
        selectedProducerId,
        setSelectedProducerId,
      }}
    >
      {children}
    </ProducersDashboardContext.Provider>
  );
};
