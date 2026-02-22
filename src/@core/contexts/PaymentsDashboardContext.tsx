'use client';
import React, {createContext, useState} from 'react';

type PaymentsDashboardContextType = {
  selectedPaymentId: string | null;
  setSelectedPaymentId: (id: string | null) => void;
};

export const PaymentsDashboardContext = createContext<
  PaymentsDashboardContextType | undefined
>(undefined);

export const PaymentsDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );

  return (
    <PaymentsDashboardContext.Provider
      value={{selectedPaymentId, setSelectedPaymentId}}
    >
      {children}
    </PaymentsDashboardContext.Provider>
  );
};
