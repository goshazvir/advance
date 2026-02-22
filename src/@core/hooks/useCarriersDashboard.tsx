// React Imports
import {useContext} from 'react';

// Context Imports
import {CarriersDashboardContext} from '../contexts/CarriersDashboardContext';

export const useCarriersDashboard = () => {
  // Hooks
  const context = useContext(CarriersDashboardContext);

  if (!context) {
    throw new Error(
      'useCarriersDashboard must be used within a CarriersDashboardProvider',
    );
  }

  return context;
};
