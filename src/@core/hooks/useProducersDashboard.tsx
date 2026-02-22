// React Imports
import {useContext} from 'react';

// Context Imports
import {ProducersDashboardContext} from '../contexts/ProducersDashboardContext';

export const useProducersDashboard = () => {
  // Hooks
  const context = useContext(ProducersDashboardContext);

  if (!context) {
    throw new Error(
      'useProducersDashboard must be used within a ProducersDashboardProvider',
    );
  }

  return context;
};
