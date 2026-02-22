// React Imports
import {useContext} from 'react';

// Context Imports
import {PaidOutContext} from '../contexts/PaidOutContext';

export const usePaidOut = () => {
  // Hooks
  const context = useContext(PaidOutContext);

  if (!context) {
    throw new Error('usePaidOut must be used within a PaidOutProvider');
  }

  return context;
};
