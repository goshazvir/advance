// React Imports
import {useContext} from 'react';

// Context Imports
import {CommissionsPayableContext} from '../contexts/CommissionsPayableContext';

export const useCommissionsPayable = () => {
  // Hooks
  const context = useContext(CommissionsPayableContext);

  if (!context) {
    throw new Error(
      'useCommissionsPayable must be used within a CommissionsPayableProvider',
    );
  }

  return context;
};
