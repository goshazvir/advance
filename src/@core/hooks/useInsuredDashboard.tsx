// React Imports
import {useContext} from 'react';

// Context Imports
import {InsuredDashboardContext} from '../contexts/InsuredDashboardContext';

export const useInsuredDashboard = () => {
  // Hooks
  const context = useContext(InsuredDashboardContext);

  if (!context) {
    throw new Error(
      'useInsuredDashboard must be used within a InsuredDashboardProvider',
    );
  }

  return context;
};
