// React Imports
import {useContext} from 'react';

// Context Imports
import {PoliciesTableContext} from '@core/contexts/PoliciesTableContext';

export const usePoliciesTable = () => {
  // Hooks
  const context = useContext(PoliciesTableContext);

  if (!context) {
    throw new Error('usePoliciesTable must be used within a PoliciesProvider');
  }

  return context;
};
