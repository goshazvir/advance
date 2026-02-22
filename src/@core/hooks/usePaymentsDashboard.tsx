// React Imports
import {useContext} from 'react';

// Context Imports
import {PaymentsDashboardContext} from '../contexts/PaymentsDashboardContext';

export const usePaymentsDashboard = () => {
  // Hooks
  const context = useContext(PaymentsDashboardContext);

  if (!context) {
    throw new Error(
      'usePaymentsDashboard must be used within a PaymentsDashboardProvider',
    );
  }

  return context;
};
