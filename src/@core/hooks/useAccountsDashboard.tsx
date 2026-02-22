// React Imports
import {useContext} from 'react';

// Context Imports
import {AccountsDashboardContext} from '../contexts/AccountsDashboardContext';

export const useAccountsDashboard = () => {
  // Hooks
  const context = useContext(AccountsDashboardContext);

  if (!context) {
    throw new Error(
      'useAccountsDashboard must be used within a AccountsDashboardProvider',
    );
  }

  return context;
};
