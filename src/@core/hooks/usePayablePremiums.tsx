// React Imports
import {useContext} from 'react';

// Context Imports
import {PayablePremiumsContext} from '../contexts/PayablePremiumsContext';

export const usePayablePremiums = () => {
  // Hooks
  const context = useContext(PayablePremiumsContext);

  if (!context) {
    throw new Error(
      'usePayablePremiums must be used within a PayablePremiumsProvider',
    );
  }

  return context;
};
