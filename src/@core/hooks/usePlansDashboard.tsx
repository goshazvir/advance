import {useContext} from 'react';

// Context Imports
import {PlansDashboardContext} from '@core/contexts/PlansDashboardContext';

export const usePlansDashboard = () => {
  // Hooks
  const context = useContext(PlansDashboardContext);

  if (!context) {
    throw new Error(
      'usePlansDashboard must be used within a PlansDashboardProvider',
    );
  }

  return context;
};
