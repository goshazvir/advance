// React Imports
import {useContext} from 'react';

// Context Imports
import {CommissionsPayoutContext} from '../contexts/CommissionsPayoutContext';

export const useCommissionsPayout = () => {
  // Hooks
  const context = useContext(CommissionsPayoutContext);

  if (!context) {
    throw new Error(
      'useCommissionsPayout must be used within a CommissionsPayoutProvider',
    );
  }

  return context;
};
